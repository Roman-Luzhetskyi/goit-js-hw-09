import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  button:document.querySelector('button'),
  input:document.querySelector('input#datetime-picker'),
  timerEl:document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}
refs.timerEl.style.display = 'flex';
refs.button.disabled = true;
let timeoutID = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
 
onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
        //  window.alert ('Please choose a date in the future')
      Notiflix.Notify.failure ('Please choose a date in the future')
      refs.button.disabled = true
    }
    if (selectedDates[0] >= options.defaultDate) {
      {
        refs.button.disabled = false
      }
    }
  },
}

const calendar = flatpickr(refs.input, options)  

const updateTime = () => {
  const currentTime = new Date()
  const selectedTime = new Date(refs.input.value)

  const deltaTime = selectedTime - currentTime

  if (deltaTime < 0) {
    return
  } else {
    const { days, hours, minutes, seconds } = convertMs(deltaTime)
    refs.days.textContent = `${days}`
    refs.hours.textContent = `${hours}`
    refs.minutes.textContent = `${minutes}`
    refs.seconds.textContent = `${seconds}`
  }
}

const onButtonClick = () => {
  timeoutID = setInterval(() => {
    updateTime()
  }, 1000)
  refs.input.disabled = true
  refs.button.disabled = true
}
refs.button.addEventListener('click', onButtonClick)
const addLeadingZero = (value) => String(value).padStart(2, '0');

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

