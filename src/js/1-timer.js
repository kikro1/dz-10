import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let intervalID;

const elemetsRefs = {
  btnStartRef: document.querySelector('button[data-start]'),
  dataInputRef: document.querySelector('input#datetime-picker'),
  dataDaysRef: document.querySelector('.value[data-days]'),
  dataHoursRef: document.querySelector('.value[data-hours]'),
  dataMinutesRef: document.querySelector('.value[data-minutes]'),
  dataSecondsRef: document.querySelector('.value[data-seconds]'),

};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      elemetsRefs.btnStartRef.disabled = userSelectedDate < Date.now();
      if (elemetsRefs.btnStartRef.disabled) {
        iziToast.error({
          message: 'Please choose a date in the future',
          messageColor: 'white',
          backgroundColor: 'red',
          position: 'topRight',
          close: false,
        });
      }
    },
  };

  flatpickr('#datetime-picker', options);

elemetsRefs.btnStartRef.disabled = true;

elemetsRefs.btnStartRef.addEventListener('click', () => {
  elemetsRefs.btnStartRef.disabled = true;
  elemetsRefs.dataInputRef.disabled = true;

  intervalID = setInterval(timerUpdate, 1000);
});


function timerUpdate() {
    if (userSelectedDate - Date.now() <= 0) {
      clearInterval(intervalID);
      elemetsRefs.dataInputRef.disabled = false;
      return;
    }
  
    const { days, hours, minutes, seconds } = convertMs(
      userSelectedDate - Date.now()
    );
  
    elemetsRefs.dataDaysRef.textContent = addLeadingZero(days);
    elemetsRefs.dataHoursRef.textContent = addLeadingZero(hours);
    elemetsRefs.dataMinutesRef.textContent = addLeadingZero(minutes);
    elemetsRefs.dataSecondsRef.textContent = addLeadingZero(seconds);
  }
  
  function addLeadingZero(value) {
    value += '';
    return value.padStart(2, '0');
  }
  
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }