const cities = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 
    'Ávila', 'Badajoz', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 
    'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Jaén', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 
    'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Las Palmas', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 
    'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];


async function getWeather(city, lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh&timezone=Europe%2FMadrid`);
        const data = await response.json();

        const weatherElement = document.createElement('div');
        weatherElement.classList.add('weather-card');
        weatherElement.innerHTML = `
          <h3>${city}</h3>
          <img src="src/${data.current_weather.weathercode}.png" onclick="window.location.href='prevision.html?city=${city}&lat=${lat}&lon=${lon}'" />
          <p>${data.current_weather.temperature}°C</p>
          <p>Viento: ${data.current_weather.windspeed} km/h</p>
        `;

        document.getElementById('weather-list').appendChild(weatherElement);
    } catch (error) {
        console.error("Error al obtener el clima:", error);
    }
}


async function fetchCitiesWeather() {
    const coordinates = {
        'Álava': { lat: 42.8500, lon: -2.6717 },
        'Albacete': { lat: 38.9967, lon: -1.8583 },
        'Alicante': { lat: 38.3450, lon: -0.4810 },
        'Almería': { lat: 36.8340, lon: -2.4637 },
        'Asturias': { lat: 43.3619, lon: -5.8481 },
        'Ávila': { lat: 40.6550, lon: -4.6900 },
        'Badajoz': { lat: 38.8790, lon: -6.9705 },
        'Burgos': { lat: 42.3417, lon: -3.6975 },
        'Cáceres': { lat: 39.4752, lon: -6.3720 },
        'Cádiz': { lat: 36.5263, lon: -6.2886 },
        'Cantabria': { lat: 43.4623, lon: -3.8095 },
        'Castellón': { lat: 39.9860, lon: -0.0500 },
        'Ciudad Real': { lat: 38.9869, lon: -3.9292 },
        'Córdoba': { lat: 37.8882, lon: -4.7794 },
        'La Coruña': { lat: 43.3623, lon: -8.4115 },
        'Cuenca': { lat: 40.0703, lon: -2.1370 },
        'Girona': { lat: 41.9794, lon: 2.8215 },
        'Granada': { lat: 37.1774, lon: -3.5986 },
        'Guadalajara': { lat: 40.6333, lon: -3.1667 },
        'Huelva': { lat: 37.2615, lon: -6.9497 },
        'Huesca': { lat: 42.1401, lon: -0.4083 },
        'Jaén': { lat: 37.7797, lon: -3.7845 },
        'León': { lat: 42.5987, lon: -5.5670 },
        'Lleida': { lat: 41.6221, lon: 0.6224 },
        'Lugo': { lat: 43.0025, lon: -7.5553 },
        'Madrid': { lat: 40.4168, lon: -3.7038 },
        'Málaga': { lat: 36.7213, lon: -4.4214 },
        'Murcia': { lat: 37.9833, lon: -1.1307 },
        'Navarra': { lat: 42.8125, lon: -1.6454 },
        'Ourense': { lat: 42.3375, lon: -7.8639 },
        'Palencia': { lat: 42.0096, lon: -4.5286 },
        'Las Palmas': { lat: 28.1235, lon: -15.4361 },
        'Pontevedra': { lat: 42.4336, lon: -8.6453 },
        'Salamanca': { lat: 40.9704, lon: -5.6630 },
        'Segovia': { lat: 40.9484, lon: -4.1270 },
        'Sevilla': { lat: 37.3886, lon: -5.9823 },
        'Soria': { lat: 41.7633, lon: -2.4636 },
        'Tarragona': { lat: 41.1189, lon: 1.2445 },
        'Teruel': { lat: 40.0712, lon: -1.1072 },
        'Toledo': { lat: 39.8628, lon: -4.0273 },
        'Valencia': { lat: 39.4699, lon: -0.3763 },
        'Valladolid': { lat: 41.6523, lon: -4.7237 },
        'Vizcaya': { lat: 43.2630, lon: -2.9350 },
        'Zamora': { lat: 41.5034, lon: -5.7448 },
        'Zaragoza': { lat: 41.6488, lon: -0.8891 }
    };

    const weatherList = document.getElementById('weather-list');
    weatherList.innerHTML = '';

    for (const city of cities) {
        const { lat, lon } = coordinates[city];
        await getWeather(city, lat, lon);
    }
}

fetchCitiesWeather();

