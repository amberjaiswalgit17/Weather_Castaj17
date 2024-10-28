// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to fetch weather data for a specific city
async function getWeather(city) {
    // Retrieve API key from a secure location, like an environment variable
    const apiKey = process.env.OPENWEATHER_API_KEY; // Ensure this is set up securely

    // Check if the API key exists to avoid undefined errors
    if (!apiKey) {
        console.error("API key is missing.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('city-name').textContent = capitalizeFirstLetter(city);
    document.getElementById('loading').style.display = 'block';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }
        const data = await response.json();

        document.getElementById('Temp').textContent = `${data.main.temp}°C`;
        document.getElementById('Temp_max').textContent = `${data.main.temp_max}°C`;
        document.getElementById('Temp_min').textContent = `${data.main.temp_min}°C`;
        document.getElementById('Feels_like').textContent = `${data.main.feels_like}°C`;
        document.getElementById('Humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('Pressure').textContent = `${data.main.pressure} mb`;
        document.getElementById('Ground_level').textContent = `${data.main.grnd_level} m`;
        document.getElementById('Sea_level').textContent = `${data.main.sea_level} m`;
        document.getElementById('Visibility').textContent = `${data.visibility / 1000} km`;
        document.getElementById('Wind_speed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('Weather_main').textContent = data.weather[0].main;
        document.getElementById('Weather').textContent = data.weather[0].description;

        const icon = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = 'block';

    } catch (error) {
        alert(error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

// Event listener for the form submission
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    }
});

// Initial fetch for the default city (Delhi)
document.addEventListener('DOMContentLoaded', () => {
    getWeather('Delhi');
});
