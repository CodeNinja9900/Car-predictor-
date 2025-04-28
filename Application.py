from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib
import os

app = Flask(__name__)

# Load dataset
df = pd.read_csv('cleaned_car.csv')

# Prepare features and target
X = df[['name', 'company', 'year', 'kms_driven', 'fuel_type']]
y = df['Price']

# Check if model exists, otherwise train and save it
if not os.path.exists('car_price_model.joblib'):
    # Preprocessing
    categorical_features = ['name', 'company', 'fuel_type']
    numerical_features = ['year', 'kms_driven']

    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
            ('num', 'passthrough', numerical_features)
        ])

    # Model pipeline
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])

    # Train model
    model.fit(X, y)

    # Save model
    joblib.dump(model, 'car_price_model.joblib')
else:
    # Load existing model
    model = joblib.load('car_price_model.joblib')


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.json
        name = data['name']
        company = data['company']
        year = int(data['year'])
        kms_driven = int(data['kms_driven'])
        fuel_type = data['fuel_type']

        # Create DataFrame for prediction
        input_data = pd.DataFrame([[name, company, year, kms_driven, fuel_type]],
                                  columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'])

        # Make prediction
        prediction = model.predict(input_data)

        # Return prediction
        return jsonify({
            'price': int(prediction[0]),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        })


if __name__ == '__main__':
    app.run(debug=True)



