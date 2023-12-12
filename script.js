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
            star.setAttribute("style", "font-size:40px; cursor: pointer; color: gray");
            star.innerHTML = '&#9733;';
            star.addEventListener('mouseover', () => this.highlightStars(i));
            star.addEventListener('mouseout', () => this.resetStars());
            star.addEventListener('click', () => this.sendRating(i));
            container.appendChild(star);
        }
        const title = document.createElement('h2')
        title.setAttribute("style", "font-family: 'Helvetica', 'Arial', monospace");
        title.innerHTML = "Rating Form";
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

    sendRating(rating) {
        if (rating / this.stars >= 0.8)
            this.ratingFeedback.innerHTML = `Thanks for ${rating} star rating!`;
        else
            this.ratingFeedback.innerHTML = `Thank you for you feedback of ${rating} stars. We'll try to do better!`; 

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

customElements.define('rating-widget', RatingWidget);