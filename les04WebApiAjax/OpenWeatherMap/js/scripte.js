const DOM = {
    message: document.querySelector('#message')
};

async function getWeather() {
    const apiKey = '8ec419b896e22640ad472aa5b0dd60cc';
    const lat = '50.8476';
    const lon = '4.3572';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=nl&appid=${apiKey}`;
    const resp = await fetch(url);
    if (!resp.ok) {
        console.log('mislukt');
        return;
    }
    const data = await resp.json();
    const description = data.weather[0].description;
    DOM.message.innerHTML = `Het is in ${data.name} ${data.main.temp}°C en ${description} .`;
}
getWeather();