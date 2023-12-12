const form_errors = [];
document.getElementById('contact-form').addEventListener('input', function(event) {
    event.preventDefault()
    const inputFieldID = event.target.id;
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const commentsField = document.getElementById('comments');
    const maxCommentLength = 80;
    const commentPattern = /[^a-zA-Z0-9'!?,.\s]/;
    const emailPattern = /[^a-zA-Z0-9@.\s]/;
    const namePattern = /[^a-zA-Z\s]/;

    if (inputFieldID === 'comments' && commentPattern.test(commentsField.value)) {
        commentsField.setCustomValidity('Illegal characters not allowed.');
        form_errors.push({'field':'comments', 'error':'Illegal characters not allowed.'});
        removeChars(commentsField, commentPattern);
        commentsField.setCustomValidity('');
        displayError('comments-error', 'Illegal characters not allowed.');
    } 
    else if (inputFieldID === 'email' && emailPattern.test(emailField.value)) {
        emailField.setCustomValidity('Illegal characters not allowed.');
        form_errors.push({'field':'email', 'error':'Illegal characters not allowed.'});
        removeChars(emailField, emailPattern);
        emailField.setCustomValidity('');
        displayError('email-error', 'Illegal characters not allowed.');
    }
    else if (inputFieldID === 'email' && !emailField.checkValidity()){
        //emailField.setCustomValidity('address is not valid');
        displayError('email-error', 'wrong email format');
    }
    else if (inputFieldID === 'name' && namePattern.test(nameField.value)) {
        nameField.setCustomValidity('Illegal characters not allowed.');
        form_errors.push({'field':'name', 'error':'Illegal characters not allowed.'});
        removeChars(nameField, namePattern);
        nameField.setCustomValidity('');
        displayError('name-error', 'Illegal characters not allowed.');
    }
    else {
        commentsField.setCustomValidity('');
      //hideErrorMessage(inputField);
    }
    commentsInfo = document.getElementById('comments-info');
    commentsLen = commentsField.value.length;
    if (maxCommentLength-commentsLen === 0){
        document.getElementById('comments-info').style.color = 'red';
        form_errors.push({'field':'comments', 'error':'Maximum character limit reached'});
    }
    else if (maxCommentLength-commentsLen > 5){
        document.getElementById('comments-info').style.color = 'white';
    }
    else{
        document.getElementById('comments-info').style.color = 'yellow';
    }
    commentsInfo.textContent = `Remaining character limit: ${maxCommentLength-commentsLen}`;
});

function displayError(fieldName, errorMessage){
    error = document.getElementById(fieldName);
    error.style.opacity = 1;
    error.textContent = errorMessage;
    setTimeout(() => {
        error.style.opacity = 0;
      }, 3000);
}

function removeChars(inputField, pattern) {
    inputField.value = inputField.value.replace(pattern, '');
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    formDataObject['form_errors'] = form_errors;

    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
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
  });

function toggleTheme() { 
    const savedTheme = localStorage.getItem('theme');
    backgroundColorDarkMode = '#24252A';
    backgroundColorLightMode = '#ffffff';
    textColorDarkMode = '#ffffff';
    textColorLightMode = '#24252A';
    
    let newTheme = 'light';
    if (!savedTheme) {    
        newTheme = 'light';
    }

    else {
        if(savedTheme == 'light')
            newTheme = 'dark';
        else
            newTheme = 'light';
    }

    document.documentElement.style.setProperty('--background-color', newTheme === 'dark' ? backgroundColorDarkMode : backgroundColorLightMode);
    document.documentElement.style.setProperty('--text-color', newTheme === 'dark' ?  textColorDarkMode: textColorLightMode);

    localStorage.setItem('theme', newTheme);
    
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#theme-switch').style.visibility = 'visible';
    backgroundColorDarkMode = '#24252A';
    backgroundColorLightMode = '#ffffff';
    textColorDarkMode = '#ffffff';
    textColorLightMode = '#24252A';
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.style.setProperty('--background-color', savedTheme === 'dark' ? backgroundColorDarkMode  :backgroundColorLightMode );
        document.documentElement.style.setProperty('--text-color', savedTheme === 'dark' ? textColorDarkMode : textColorLightMode);
    }
});