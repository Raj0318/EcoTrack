document.getElementById('footprintForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default submission

    // Input values
    const transport = document.getElementById('transport').value;
    const distance = parseFloat(document.getElementById('distance').value);
    const electricitySource = document.getElementById('electricity-source').value;
    const electricityHours = parseInt(document.getElementById('electricity-hours').value);
    const mealType = document.getElementById('meals').value;
    const mealCount = parseInt(document.getElementById('meal-count').value);
    const waste = parseFloat(document.getElementById('waste').value);
    const recycling = parseInt(document.getElementById('recycling').value) / 100;
    const waterUsage = parseFloat(document.getElementById('water-usage').value);

    // Constants
    const transportEmissions = {
        'car-petrol': 2.3,
        'car-diesel': 2.7,
        'car-electric': 0.5,
        bus: 0.8,
        train: 0.4,
        plane: 5.0,
        bike: 0.1,
        walk: 0,
    };
    const mealEmissions = {
        'non-veg': 2.5,
        veg: 1.5,
        vegan: 1.0,
    };
    const electricityEmissions = {
        renewable: 0.1,
        'non-renewable': 0.5,
    };
    const waterEmissionFactor = 0.002; // kg CO2 per liter
    const wasteEmissionFactor = 2.5; // kg CO2 per kg of waste

    // Calculations
    const transportEmission = distance * transportEmissions[transport];
    const electricityEmission = electricityHours * electricityEmissions[electricitySource];
    const mealEmission = mealCount * mealEmissions[mealType];
    const wasteEmission = waste * (1 - recycling) * wasteEmissionFactor;
    const waterEmission = waterUsage * waterEmissionFactor;

    const totalFootprint = (
        transportEmission +
        electricityEmission +
        mealEmission +
        wasteEmission +
        waterEmission
    );

    // Display the result
    document.getElementById('result').innerHTML = `
        <p><strong>Total Carbon Footprint:</strong> ${totalFootprint.toFixed(2)} kg CO2/day</p>
        <ul>
            <li>🚗 Transportation: ${transportEmission.toFixed(2)} kg CO2</li>
            <li>⚡ Energy: ${electricityEmission.toFixed(2)} kg CO2</li>
            <li>🍴 Meals: ${mealEmission.toFixed(2)} kg CO2</li>
            <li>♻️ Waste: ${wasteEmission.toFixed(2)} kg CO2</li>
            <li>💧 Water: ${waterEmission.toFixed(2)} kg CO2</li>
        </ul>
    `;
});
