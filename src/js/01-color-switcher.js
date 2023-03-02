const startButton = document.querySelector("[data-start]");
const endButton = document.querySelector("[data-stop]");

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
let timerId = null;

const changeBodyColor = (color) => {
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor()
        startButton.setAttribute('disabled', true);
    }, 1000) 
}

const stopChangeBodyColor = () => {
    startButton.removeAttribute('disabled');
    // startButton.setAttribute('disabled', false);
    clearInterval(timerId);
}

startButton.addEventListener("click", changeBodyColor);

endButton.addEventListener("click", stopChangeBodyColor);