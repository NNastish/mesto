let profileEditButton = document.querySelector("#edit"); //выбираем кнопку редактирования профиля
let popup = document.querySelector(".popup"); //выбираем блок с попап
let popupCloseButton = document.querySelector(".popup__close"); //выбираем кнопку закрытия попап
let profileTitle = document.querySelector(".profile__title"); //выбираем заголовок, который нужно поменять
let profileText = document.querySelector(".profile__text"); //выбираем параграф, который нужно поменять
let nameInput = document.querySelector("#name"); //выбираем  строку ввода имени, которая будет менять заголовок
let aboutInput = document.querySelector("#about"); //выбираем  строку ввода описания, которая будет менять параграф
let formButton = document.querySelector(".form"); //выбираем  кнопку, которая будет сохранять изменения

function copyValue() {
    nameInput.value = profileTitle.textContent; //копирование заголовка
    aboutInput.value = profileText.textContent; //копирование параграфа
}

function openPopup() {
    copyValue();
    popup.classList.add("popup_opened"); // функция открыть попап
}

function closePopup() {
    popup.classList.remove("popup_opened"); //функция закрыть попап
}

function formSubmitHandler(evt) {
    // функция сохранить новые данные
    evt.preventDefault(); //отмена стандартного реагирования браузера на событие *поправка от ревьюера
    profileTitle.textContent = nameInput.value; // меняем заголовок
    profileText.textContent = aboutInput.value; // меняет параграф
    closePopup(); // закрываем попап
}

profileEditButton.addEventListener("click", openPopup); //действие "клик по кнопке"
popupCloseButton.addEventListener("click", closePopup); // действие "клип по кнопке"
formButton.addEventListener("submit", formSubmitHandler); // действие "отправить форму"
