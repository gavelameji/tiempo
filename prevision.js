async function getWeatherForecast(city, lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=celsius&windspeed_unit=kmh&timezone=Europe%2FMadrid`);
        const data = await response.json();

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-container');
        let forecastHTML = "";
        data.daily.time.forEach((date, index) => {
            forecastHTML += `
                <div class="prevision-dia">
                    <p><strong>${new Date(date).toLocaleDateString()}</strong></p>
                    <p>Máxima: ${data.daily.temperature_2m_max[index]}°, Mínima: ${data.daily.temperature_2m_min[index]}°C</p>
                    <p>${data.daily.weathercode}</p>
                </div>
            `;
        });

        forecastElement.innerHTML = forecastHTML;
        document.getElementById('weather-forecast').appendChild(forecastElement);
    } catch (error) {
        console.error("Error al obtener la previsión del clima:", error);
    }
}

const params = new URLSearchParams(window.location.search);
const city = params.get('city');
const lat = params.get('lat');
const lon = params.get('lon');

if (city && lat && lon) {
    document.getElementById('city-name').innerText = `Previsión para ${city}`;
    console.log(`Ciudad: ${city}, Latitud: ${lat}, Longitud: ${lon}`);
    getWeatherForecast(city, lat, lon);
} else {
    console.error("Faltan parámetros en la URL.");
}