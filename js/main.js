import {createPhotos} from './data.js';
import {createMiniatures} from './PhotoUserList.js';
import {isEscapeKey,maxLength} from './util.js'; // не забыть удалить
const miniatures = createPhotos();
// console.log(miniatures)
createMiniatures(miniatures);


///// экспортировать
const formAddPicture = document.querySelector('.img-upload__form');
const UploadForm = document.querySelector('.img-upload__overlay');
const formInput = document.querySelector('.img-upload__input');
formInput.addEventListener('change', (evt)=> {
  UploadForm.classList.remove('hidden');
}

)
// UploadForm.classList.remove('hidden');
const closeButtonForm = document.querySelector('.img-upload__cancel');

const removeUploadFormHidden = () => {
  UploadForm.classList.add('hidden');
  removeEventListener('keydown',removeUploadFormHidden);
};

closeButtonForm.addEventListener('click', removeUploadFormHidden);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeUploadFormHidden();
  }
});

//валидация
const pristineDefaultConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'img-upload__field-wrapper',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-help',
};

const pristine = new Pristine(formAddPicture, pristineDefaultConfig);
const hashtagRegular = /^#[a-zа-яё0-9]{1,19}$/i; //
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
pristine.addValidator(descriptionField, maxLength, 'От 2 до 50 символов');

const validateHashtagRegular = (value) => hashtagRegular.test(value);

pristine.addValidator(hashtagInput, validateHashtagRegular, 'ddddddd');

descriptionField.addEventListener('input', () => {
  if (descriptionField.value === '') {
    descriptionField.parentNode.classList.remove('has-success');
  }
});

hashtagInput.addEventListener('input', (evt) => {
  if (hashtagInput.value === '') {
    hashtagInput.parentNode.classList.remove('has-danger');
  }
});

formAddPicture.addEventListener('submit', (evt) => {
  const valid = pristine.validate();
  if (valid) {
    // debugger
    return
  }
  evt.preventDefault();

});


////slider
// const listItemEffect = document.querySelectorAll('.effects__item');
// const span = listItemEffect.querySelector('span');
const listEffects = document.querySelectorAll('.effects__radio');

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const specialElement = document.querySelector('.effects__radio');
const pictureInSlider = document.querySelector('.img-upload__preview').firstElementChild;
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');



listEffects.forEach((listItem) => listItem.addEventListener('change',
  (evt) => {

  const nameClassEffect = evt.target.parentNode.querySelector('span').classList[1];
  pictureInSlider.classList.add(nameClassEffect);
  }

));

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (...rest) => {
  // console.log(rest);
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});


// effectChrome.addEventListener('change', (evt) => {
//   if (evt.target.checked) {

//     pictureInSlider.classList.add('effects__preview--chrome');
//   } else {
//     // Цена и шаг по умолчанию
//   }
// });

