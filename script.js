class RatingWidget extends HTMLElement {
    constructor() {
        super();
        this.stars = document.getElementById('rating').getAttribute('max');
        this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.classList.add('rating');


        for (let i = 1; i <= this.stars; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.setAttribute("style", "font-size:40px; cursor: pointer; color: gray; transition: 0.3s;");
            star.innerHTML = '&#9733;';
            star.addEventListener('mouseover', () => this.highlightStars(i));
            star.addEventListener('mouseout', () => this.resetStars());
            star.addEventListener('click', () => this.sendForm(i));
            container.appendChild(star);
        }
        const title = document.createElement('h2')
        title.setAttribute("style", "font-family: 'Helvetica', 'Arial', monospace");
        title.innerHTML = "Rating Widget";
        this.shadowRoot.appendChild(title);
        this.shadowRoot.appendChild(container);
        this.ratingFeedback = document.createElement('p');
        this.ratingFeedback.setAttribute("style", "font-family: 'Roboto Mono', 'Arial', monospace; max-width: 80%");
        this.shadowRoot.appendChild(this.ratingFeedback);
    }

    highlightStars(count) {
        const stars = this.shadowRoot.querySelectorAll('.star');
        let starColor = getComputedStyle(document.documentElement).getPropertyValue('--star-color');
        stars.forEach((star, index) => {
            star.style.color = index < count ? starColor : 'gray';
        });
    }

    resetStars() {
        const stars = this.shadowRoot.querySelectorAll('.star');
        stars.forEach(star => {
            star.style.color = 'gray';
        });
    }

    sendForm(rating) {
        if (rating / this.stars >= 0.8)
            this.ratingFeedback.innerHTML = `Thanks for ${rating} star rating!`;
        else
            this.ratingFeedback.innerHTML = `Thank you for your feedback of ${rating} ${rating === 1 ? ' star' : ' stars'}. We'll try to do better!`; 


        const formDataObject = {};
        formDataObject['rating'] = rating;
        formDataObject['sentBy'] = 'JS';

        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
              'X-Sent-By': 'JS',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Form submitted successfully:', data);
          })
          .catch(error => {
            console.error('Error submitting form:', error);
          });
    }
}

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
customElements.define('rating-widget', RatingWidget);