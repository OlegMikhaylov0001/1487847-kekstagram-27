import {createPhotos} from './data.js';
import {createMiniatures} from './PhotoUserList.js';
import {isEscapeKey,maxLength} from './util.js'; // не забыть удалить
const miniatures = createPhotos();
// console.log(miniatures)
createMiniatures(miniatures);


///// экспортировать
const formAddPicture = document.querySelector('.img-upload__form');
const UploadForm = document.querySelector('.img-upload__overlay');
UploadForm.classList.remove('hidden');
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

pristine.addValidator(hashtagInput, validateHashtagRegular);

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
  evt.preventDefault();
  const valid = pristine.validate();
  console.log(valid);
});


////slider
const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  start: [20, 80],
  connect: true,
  range: {
      'min': 0,
      'max': 100
  }
});

