// alert('JS, hellYOOOOO');

let profileEditButton = document.querySelector('#edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');


function profileEdit() {
    popup.classList.add('popup_open');
}

profileEditButton.addEventListener('click', profileEdit);

function popupClose() {
    popup.classList.remove('popup_open');
}
popupCloseButton.addEventListener('click', popupClose);

// let saveButton = document.querySelector('.form__button');

// function save() {
//     saveButton.classList.add
// }