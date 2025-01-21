const coordinates = {
    "Madrid": { lat: 40.4168, lon: -3.7038 },
    "Barcelona": { lat: 41.3851, lon: 2.1734 },
    "Valencia": { lat: 39.4699, lon: -0.3763 },
    "Sevilla": { lat: 37.3886, lon: -5.9823 },
    "Zaragoza": { lat: 41.6488, lon: -0.8891 },
    "Málaga": { lat: 36.7213, lon: -4.4214 },
    "Murcia": { lat: 37.9922, lon: -1.1307 },
    "Palma": { lat: 39.5696, lon: 2.6502 },
    "Las Palmas de Gran Canaria": { lat: 28.1235, lon: -15.4363 },
    "Bilbao": { lat: 43.2630, lon: -2.9350 },
    "Alicante": { lat: 38.3452, lon: -0.4810 },
    "Córdoba": { lat: 37.8882, lon: -4.7794 },
    "Valladolid": { lat: 41.6523, lon: -4.7245 },
    "Vigo": { lat: 42.2406, lon: -8.7207 },
    "Gijón": { lat: 43.5450, lon: -5.6611 },
    "L'Hospitalet de Llobregat": { lat: 41.3662, lon: 2.1165 },
    "A Coruña": { lat: 43.3623, lon: -8.4115 },
    "Vitoria-Gasteiz": { lat: 42.8467, lon: -2.6717 },
    "Granada": { lat: 37.1765, lon: -3.5979 },
    "Elche": { lat: 38.2699, lon: -0.7126 },
    "Oviedo": { lat: 43.3603, lon: -5.8448 },
    "Santa Cruz de Tenerife": { lat: 28.4682, lon: -16.2546 },
    "Badalona": { lat: 41.4500, lon: 2.2474 },
    "Cartagena": { lat: 37.6051, lon: -0.9862 },
    "Terrassa": { lat: 41.5615, lon: 2.0089 },
    "Jerez de la Frontera": { lat: 36.6850, lon: -6.1261 },
    "Sabadell": { lat: 41.5463, lon: 2.1086 },
    "Móstoles": { lat: 40.3223, lon: -3.8640 },
    "Alcalá de Henares": { lat: 40.4819, lon: -3.3635 },
    "Pamplona": { lat: 42.8125, lon: -1.6458 },
    "Fuenlabrada": { lat: 40.2839, lon: -3.7940 },
    "Almería": { lat: 36.8340, lon: -2.4637 },
    "San Sebastián": { lat: 43.3213, lon: -1.9853 },
    "Leganés": { lat: 40.3286, lon: -3.7635 },
    "Burgos": { lat: 42.3439, lon: -3.6969 },
    "Santander": { lat: 43.4623, lon: -3.8099 },
    "Castellón de la Plana": { lat: 39.9864, lon: -0.0513 },
    "Getafe": { lat: 40.3083, lon: -3.7325 },
    "Alcorcón": { lat: 40.3468, lon: -3.8278 },
    "San Cristóbal de La Laguna": { lat: 28.4874, lon: -16.3159 },
    "Logroño": { lat: 42.4669, lon: -2.4457 },
    "Badajoz": { lat: 38.8794, lon: -6.9706 },
    "Huelva": { lat: 37.2614, lon: -6.9447 },
    "Salamanca": { lat: 40.9701, lon: -5.6635 },
    "Marbella": { lat: 36.5101, lon: -4.8824 },
    "Lleida": { lat: 41.6176, lon: 0.6200 },
    "Tarragona": { lat: 41.1189, lon: 1.2445 },
    "León": { lat: 42.5987, lon: -5.5671 },
    "Cádiz": { lat: 36.5164, lon: -6.2994 },
    "Jaén": { lat: 37.7796, lon: -3.7849 },
    "Ourense": { lat: 42.3364, lon: -7.8633 },
    "Albacete": { lat: 38.9955, lon: -1.8570 },
    "Girona": { lat: 41.9818, lon: 2.8249 },
    "Cáceres": { lat: 39.4750, lon: -6.3722 },
    "Lugo": { lat: 43.0121, lon: -7.5558 },
    "Santiago de Compostela": { lat: 42.8782, lon: -8.5448 },
    "Parla": { lat: 40.2350, lon: -3.7675 },
    "Torrevieja": { lat: 37.9780, lon: -0.6822 },
    "Mérida": { lat: 38.9181, lon: -6.3444 },
    "Ciudad Real": { lat: 38.9835, lon: -3.9272 },
    "Fuengirola": { lat: 36.5417, lon: -4.6220 },
    "Ceuta": { lat: 35.8894, lon: -5.3213 },
    "Melilla": { lat: 35.2923, lon: -2.9388 }
};

const cities = Object.keys(coordinates);

const weatherDataList = []; 

async function getWeather(city, lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh&timezone=Europe%2FMadrid`);
        const data = await response.json();
        weatherDataList.push({
            city,
            lat,
            lon,
            temperature: data.current_weather.temperature,
            windspeed: data.current_weather.windspeed,
            winddirection: data.current_weather.winddirection,
            weathercode: data.current_weather.weathercode
        });
    } catch (error) {
        console.error("Error al obtener el clima:", error);
    }
}

function showWeather() {
    const weatherListElement = document.getElementById('weather-list');
    weatherListElement.innerHTML = '';
    weatherDataList.forEach(weatherData => {
        const weatherElement = document.createElement('div');
        weatherElement.classList.add('weather-card');
        weatherElement.innerHTML = `
          <h3>${weatherData.city}</h3>
          <img src="src/${weatherData.weathercode}.png" onclick="window.location.href='prevision.html?city=${weatherData.city}&lat=${weatherData.lat}&lon=${weatherData.lon}'" />
          <p>${weatherData.temperature}°C</p>
          <p>Viento: ${weatherData.windspeed} km/h, ${getWindDirectionCardinal(weatherData.winddirection)}</p>
        `;
        weatherListElement.appendChild(weatherElement);
    });
}

function getWindDirectionCardinal(winddirection) {
    const directions = [
        "N",  "NE", "E",  "SE",
        "S",  "SO", "O",  "NO"
    ];
    const index = Math.round(winddirection / 45) % 8;
    return directions[index];
}


async function fetchCitiesWeather() {

    const weatherList = document.getElementById('weather-list');
    const loadingIndicator = document.getElementById('loading');

    loadingIndicator.innerText = "Cargando datos...";

    weatherList.innerHTML = '';
    for (var i=0; i<cities.length; i++) {
        const { lat, lon } = coordinates[cities[i]];
        await getWeather(cities[i], lat, lon);
        if(i%5 == 0 && i!=0) 
            showWeather();
    }
    showWeather()

    loadingIndicator.innerText = "";
}

fetchCitiesWeather();

