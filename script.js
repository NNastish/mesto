let profileEditButton = document.querySelector("#edit"); //выбираем кнопку редактирования профиля
let popup = document.querySelector(".popup"); //выбираем блок с попап
let popupCloseButton = document.querySelector(".popup__close"); //выбираем кнопку закрытия попап

function profileEdit() {
    popup.classList.add("popup_open"); // функция открыть попап
}

profileEditButton.addEventListener("click", profileEdit); //действие "клик по кнопке"

function popupClose() {
    popup.classList.remove("popup_open"); //функция закрыть попап
}
popupCloseButton.addEventListener("click", popupClose); // действие "клип по кнопке"

let profileTitle = document.querySelector(".profile__title"); //выбираем заголовок, который нужно поменять
let profileText = document.querySelector(".profile__text"); //выбираем параграф, который нужно поменять
let nameInput = document.querySelector("#name"); //выбираем  строку ввода имени, которая будет менять заголовок
let aboutInput = document.querySelector("#about"); //выбираем  строку ввода описания, которая будет менять параграф
let formButton = document.querySelector(".form__button"); //выбираем  кнопку, которая будет сохранять изменения

function formSubmitHandler(evt) {
    // функция сохранить новые данные
    evt.preventDefault(); //отмена стандартного события, чтобы страница не перегружалась? (как на вебинаре)
    profileTitle.textContent = nameInput.value; // меняем заголовок
    profileText.textContent = aboutInput.value; // меняет параграф
    popup.classList.remove("popup_open"); // закрываем попап
}
formButton.addEventListener("click", formSubmitHandler); // действие "клик по кнопке"
