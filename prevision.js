async function getWeatherForecast(city, lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,wind_speed_10m_max&temperature_unit=celsius&windspeed_unit=kmh&timezone=Europe%2FMadrid`);
        
        const data = await response.json();

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-container');
        let forecastHTML = "";
        data.daily.time.forEach((date, index) => {
            forecastHTML += `
                <div class="prevision-dia">
                    <p><strong>${new Date(date).toLocaleDateString()}</strong></p>
                    <img src="src/${data.daily.weathercode[index]}.png"</p>
                    <p>Máxima: ${data.daily.temperature_2m_max[index]}°, Mínima: ${data.daily.temperature_2m_min[index]}°C</p>
                    <p>Probabilidad De Lluvia: ${data.daily.precipitation_probability_max[index]}%</p>
                    <p>Viento: ${data.daily.wind_speed_10m_max[index]} km/h</p>
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

async function downloadForecast(city, lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,wind_speed_10m_max&temperature_unit=celsius&windspeed_unit=kmh&timezone=Europe%2FMadrid`);
        const data = await response.json();
        let forecastText = `Previsión Semanal Para ${city}:\n\n`;
        forecastText += "Fecha\t\tMínima (°C)\tMáxima (°C)\tProb. Lluvia\n";
        forecastText += "------------------------------------------------------------\n";
        data.daily.time.forEach((date, index) => {
            forecastText += `${date}\t${data.daily.temperature_2m_min[index]}°C\t\t${data.daily.temperature_2m_max[index]}°C \t\t${data.daily.precipitation_probability_max[index]}%\n`;
        });
        forecastText += "------------------------------------------------------------\n"
        forecastText += "CC 2025 HispaTiempo.es - Enol Monte Soto"
        const blob = new Blob([forecastText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Prevision_${city}_HispaTiempo.txt`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error al descargar la previsión:", error);
        alert("No se pudo generar la previsión. Por favor, intenta nuevamente.");
    }
}

var button = document.getElementById("download-button")
button.addEventListener('click', () => {
    downloadForecast(city, lat, lon);
});

if (city && lat && lon) {
    document.getElementById('city-name').innerText = `Previsión semanal para ${city}`;
    console.log(`Ciudad: ${city}, Latitud: ${lat}, Longitud: ${lon}`);
    getWeatherForecast(city, lat, lon);
} else {
    console.error("Faltan parámetros en la URL.");
}