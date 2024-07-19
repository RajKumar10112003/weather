async function getWeather() {
    const apiKey = '40dae6e14f6faee0ac458c85facd8240';
    const city = document.getElementById('city').value.trim();
    const weatherInfo = document.getElementById('weather-info');
    const weatherContainer = document.querySelector('.weather-container');
    
    weatherInfo.innerHTML = '';
    weatherContainer.style.backgroundImage = '';

    if (!city) {
        weatherInfo.innerHTML = '<p>Enter a city name</p>';
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherResponse.ok) {
            const weather = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            weatherInfo.innerHTML = `
                <h2>${city}</h2>
                <p>${weather}</p>
                <p>Temperature: ${temperature}°C</p>
            `;

            const weatherCondition = weatherData.weather[0].main.toLowerCase();
            const conditionImages = {
                clear: 'https://th.bing.com/th/id/OIP.YYYhW_qvySbr5FWKUrSyzQAAAA?rs=1&pid=ImgDetMain',
                clouds: 'https://img.freepik.com/premium-photo/white-clouds-bright-blue-sky-beauty-nature_197292-1138.jpg',
                rain: 'https://th.bing.com/th/id/OIP.V5NRUPu_tkRJFp_Rl-FnyAHaHa?rs=1&pid=ImgDetMain',
                snow: 'https://images.hdqwalls.com/download/snow-sky-winter-49-2560x1440.jpg',
                thunderstorm: 'https://www.worldatlas.com/upload/74/c1/1f/shutterstock-1125324449.jpg',
                drizzle: 'https://miro.medium.com/v2/resize:fit:800/0*cPtBUq5XDWYc7oBT.jpg',
                mist: 'https://cdn.pixabay.com/photo/2010/12/13/09/51/fog-1795_1280.jpg',
                scattered:"https://pixnio.com/free-images/nature-landscapes/sky/currambine-skyscape-scattered-clouds-blue-sky.jpg",
                overcast:"https//images.pexels.com/photos/8264227/pexels-photo-8264227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            };

            if (conditionImages[weatherCondition]) {
                weatherContainer.style.backgroundImage = `url(${conditionImages[weatherCondition]})`;
                weatherContainer.style.backgroundSize = 'cover';
                weatherContainer.style.backgroundPosition = 'center';
            } else {
                weatherContainer.style.backgroundImage = 'none';
            }
        } else {
            weatherInfo.innerHTML = `<p>${weatherData.message}</p>`;
            weatherContainer.style.backgroundImage = 'none';
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p>Error fetching weather data.</p>';
        weatherContainer.style.backgroundImage = 'none';
    }
}
 