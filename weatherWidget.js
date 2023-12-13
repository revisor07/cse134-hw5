class WeatherWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.title_elem = document.createElement('h2');
        this.title_elem.setAttribute("style", "font-family: 'Helvetica', 'Arial', monospace");
        this.title_elem.textContent = "Weather Widget";
        this.shadowRoot.appendChild(this.title_elem);

        this.summary_elem = document.createElement('p');
        this.summary_elem.setAttribute("style", "font-family: 'Roboto Mono', 'Arial', monospace; max-width: 80%");
        this.summary_elem.textContent = "Loading...";
        this.shadowRoot.appendChild(this.summary_elem);
        this.fetchWeatherData();
    }

    fetchWeatherData() {
        let latitude = 32.8426;
        let longitude = -117.2577;
        const apiEndpoint = `https://api.weather.gov/points/${latitude},${longitude}`;

        let location = "";
        let temp = "";
        let details = "";
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                location = data.properties.relativeLocation.properties.city;
                return fetch(data.properties.forecast);
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                temp = data.properties.periods[0].temperature;
                details = data.properties.periods[0].detailedForecast;
                this.summary_elem.textContent = `${location}: ${temp}°F`;
                const details_elem = document.createElement('p')
                details_elem.setAttribute("style", "font-family: 'Roboto Mono', 'Arial', monospace; max-width: 80%");
                details_elem.textContent = `${details}`;
                this.shadowRoot.appendChild(details_elem);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.summary_elem.textContent  = 'Error fetching weather data';
            });
    }
}

customElements.define('weather-widget', WeatherWidget);