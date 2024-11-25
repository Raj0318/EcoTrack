document.getElementById('footprintForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from submitting and reloading the page

    // Get user input values
    const transport = document.getElementById('transport').value;
    const mealType = document.getElementById('meals').value;
    const mealCount = parseInt(document.getElementById('meal-count').value);
    const electricityHours = parseInt(document.getElementById('electricity-hours').value);

    // Carbon footprint calculation logic
    const transportEmissions = {
        "car": 2.3,  // kg CO2 per km
        "bike": 0.1,  // kg CO2 per km
        "bus": 0.8,   // kg CO2 per km
        "walk": 0     // kg CO2 per km
    };

    const vegMealEmission = 1.5;  // kg CO2 per Veg meal
    const nonVegMealEmission = 2.5; // kg CO2 per Non-Veg meal
    const electricityEmissionPerHour = 0.5; // kg CO2 per hour of electricity usage

    // Determine the emission based on meal type
    const mealEmission = mealType === "veg" ? vegMealEmission : nonVegMealEmission;

    // Calculate the carbon footprint
    const footprint = (
        transportEmissions[transport] +
        (mealCount * mealEmission) +
        (electricityHours * electricityEmissionPerHour)
    );

    // Display the result
    document.getElementById('result').innerText = `Your carbon footprint is ${footprint.toFixed(2)} kg CO2/day.`;
});
