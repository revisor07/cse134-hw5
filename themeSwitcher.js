/* DARK AND LIGHT THEME SWITCH IS DESIGNED TO ONLY WORK IN /EXTRAS PAGE PATH, NOT THE MAIN PAGE */
let backgroundColorDarkMode = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
let backgroundColorLightMode = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
let textColorDarkMode = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
let textColorLightMode = getComputedStyle(document.documentElement).getPropertyValue('--background-color');

function toggleTheme() {
    const savedTheme = localStorage.getItem('theme');
    
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

    document.documentElement.style.setProperty('--mode-background-color', newTheme === 'dark' ? backgroundColorDarkMode : backgroundColorLightMode);
    document.documentElement.style.setProperty('--mode-text-color', newTheme === 'dark' ?  textColorDarkMode: textColorLightMode);

    localStorage.setItem('theme', newTheme);

    let themeIndicator = document.getElementById('current-theme-text');
    themeIndicator.textContent = newTheme === "dark" ? "Dark Mode": "Light Mode";
    document.documentElement.style.setProperty('--text-color', backgroundColorLightMode);
    
}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#theme-switch').style.visibility = 'visible';
    let themeIndicator = document.getElementById('current-theme-text');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.style.setProperty('--mode-background-color', savedTheme === 'dark' ? backgroundColorDarkMode  : backgroundColorLightMode);
        document.documentElement.style.setProperty('--mode-text-color', savedTheme === 'dark' ? textColorDarkMode : textColorLightMode);
        themeIndicator.textContent = savedTheme === "dark" ? "Dark Mode": "Light Mode";
    }
    document.documentElement.style.setProperty('--text-color', backgroundColorLightMode);
});