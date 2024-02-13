import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formSubmitRef = document.querySelector('.form');

formSubmitRef.addEventListener('submit', e => {
  e.preventDefault();
  const delay = formSubmitRef.elements.delay.value;
  const state = formSubmitRef.elements.state.value;
  createNewPromise(delay, state);
  formSubmitRef.reset();
});

function createNewPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        close: false,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        close: false,
      });
    });
}