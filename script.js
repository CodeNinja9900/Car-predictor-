document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const carForm = document.getElementById('carForm');
    const companySelect = document.getElementById('company');
    const carNameInput = document.getElementById('carName');
    const yearInput = document.getElementById('year');
    const kmsInput = document.getElementById('kms');
    const fuelTypeSelect = document.getElementById('fuelType');
    const resultBox = document.getElementById('resultBox');

    // Unique companies from dataset
    const companies = [
        'Hyundai', 'Mahindra', 'Ford', 'Maruti Suzuki', 'Skoda',
        'Audi', 'Toyota', 'Renault', 'Honda', 'Tata', 'Chevrolet',
        'Datsun', 'Volkswagen', 'Mitsubishi', 'BMW', 'Mercedes Benz',
        'Land Rover', 'Jaguar', 'Force Motors', 'Fiat', 'Mini', 'Volvo'
    ];

    // Populate company dropdown
    companies.sort().forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
    });

    // Form submission
    carForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const company = companySelect.value;
        const carName = carNameInput.value;
        const year = parseInt(yearInput.value);
        const kms = parseInt(kmsInput.value);
        const fuelType = fuelTypeSelect.value;

        // Validate inputs
        if (!company || !carName || !year || !kms || !fuelType) {
            alert('Please fill in all fields');
            return;
        }

        if (year < 1990 || year > new Date().getFullYear()) {
            alert('Please enter a valid year between 1990 and current year');
            return;
        }

        if (kms < 0) {
            alert('Kilometers driven cannot be negative');
            return;
        }

        // Simulate API call to backend (will be replaced with actual fetch)
        simulatePrediction(company, carName, year, kms, fuelType);
    });

    // Simulate prediction (replace with actual API call)
    function simulatePrediction(company, carName, year, kms, fuelType) {
        // Show loading state
        resultBox.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Calculating your car's value...</p>
            </div>
        `;

        // Simulate API delay
        setTimeout(() => {
            // Simple price calculation for demo
            // In a real app, this would come from your ML model
            const basePrice = 500000; // Base price in INR
            const yearFactor = (year - 2000) * 10000;
            const kmsFactor = (100000 - kms) * 10;
            const randomFactor = Math.floor(Math.random() * 100000);

            const predictedPrice = basePrice + yearFactor + kmsFactor + randomFactor;

            // Format as currency
            const formattedPrice = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(predictedPrice);

            // Display result
            resultBox.innerHTML = `
                <div class="price-result">
                    <h3>${formattedPrice}</h3>
                    <div class="car-details">
                        <p><strong>${company} ${carName}</strong></p>
                        <p>Year: ${year}</p>
                        <p>Kms Driven: ${kms.toLocaleString()}</p>
                        <p>Fuel Type: ${fuelType}</p>
                    </div>
                    <button class="cta-button" style="margin-top: 1rem;">
                        <i class="fas fa-download"></i> Download Report
                    </button>
                </div>
            `;
        }, 1500);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});