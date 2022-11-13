import {createPhotos} from './data.js';
import {createMiniatures} from './PhotoUserList.js';
import {isEscapeKey} from './util.js'; // не забыть удалить
const miniatures = createPhotos();
// console.log(miniatures)
createMiniatures(miniatures);


///// экспортировать
const UploadForm = document.querySelector('.img-upload__overlay');
UploadForm.classList.remove('hidden');
const closeButtonForm = document.querySelector('.img-upload__cancel');

const removeUploadFormHidden = () => UploadForm.classList.add('hidden');

closeButtonForm.addEventListener('click', removeUploadFormHidden);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeUploadFormHidden();
  }
});
////
