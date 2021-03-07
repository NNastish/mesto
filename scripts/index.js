const popup = document.querySelector(".popup"); //выбираем блок с попап
const profileEditButton = document.querySelector("#edit"); //выбираем кнопку редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit"); //выбираем второй попап для редактирования по модификатору
const profileAddButton = document.querySelector("#add"); //выбираем кнопку добавления фотографии
const popupAddCard = document.querySelector(".popup_type_add"); //выбираем второй попап для добавления фотографий по модификатору
const popupCloseButton = document.querySelectorAll(".popup__close"); //выбираем кнопку закрытия попап
const profileTitle = document.querySelector(".profile__title"); //выбираем заголовок, который нужно поменять
const profileText = document.querySelector(".profile__text"); //выбираем параграф, который нужно поменять
const nameInput = document.querySelector("#name"); //выбираем  строку ввода имени, которая будет менять заголовок
const aboutInput = document.querySelector("#about"); //выбираем  строку ввода описания, которая будет менять параграф
// const formButton = document.querySelector(".form"); //выбираем  кнопку, которая будет сохранять изменения
const saveNewProfileInfo = document.querySelector('#save-button');
const createNewCard = document.querySelector('#create-button');


const cardTemplate = document.querySelector("#template"); //выбираем темплэйт
const cardAdd = document.querySelector(".card"); //выбираем заготовку для карточки в теплэйт
const cardsContainer = document.querySelector(".cards"); //выбираем дивчик с карточками
const titleInput = document.querySelector("#input-title"); //выбираем строку ввода названия
const linkInput = document.querySelector("#input-link"); //выбираем строку ввода ссылки

const initialCards = [ 
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  
  function addInitialCards() { //функция с добавлением карточек в див 

    initialCards.forEach(function(item) {
        let blockCard =  `
          <article class="card">
              <img src="${item.link}" alt="${item.name}" class="card__photo" />
              <div class="card__lists">
                  <h2 class="card__title">${item.name}</h2>
                  <button type="button" class="card__like"></button>
               </div>
          </article>
          `;
          cardsContainer.insertAdjacentHTML("afterbegin", blockCard);
      });
  };
  
  
  function copyValue() {
      nameInput.value = profileTitle.textContent; //копирование заголовка
      aboutInput.value = profileText.textContent; //копирование параграфа
    }
    
    function openPopup(popupElement) {
        copyValue();
        popupElement.classList.add("popup_opened"); // функция открыть попап
    }
    
    function closePopup() {
        popupEditProfile.classList.remove("popup_opened"); //функция закрыть попап редактирования
        popupAddCard.classList.remove("popup_opened"); //функция закрыть попап добавления фото
    }
    
    function submitProfileForm(evt) {
        // функция сохранить новые данные
        evt.preventDefault(); //отмена стандартного реагирования браузера на событие *поправка от ревьюера
        profileTitle.textContent = nameInput.value; // меняем заголовок
        profileText.textContent = aboutInput.value; // меняет параграф
        alert("hello");
        closePopup(); // закрываем попап
    }
    
    
    function submitCardForm(evt) {
        
        evt.preventDefault();
        alert("sssssss");
        closePopup();
    }
    
//________________Вызов функций
addInitialCards(); //вызов функции с добавлением карточек
profileEditButton.addEventListener("click", function() {
    openPopup(popupEditProfile);
}); //действие "клик по кнопке редактирования"

profileAddButton.addEventListener("click", function() {
    openPopup(popupAddCard);
}); //действие "клик по кнопке добавить фото"

popupCloseButton.forEach((button) => button.addEventListener("click", function() {
    closePopup();
})); //действие "клик по кнопке, которое закрывает попапы (редактирования и добавления фото)"

saveNewProfileInfo.addEventListener("submit", submitProfileForm);
createNewCard.addEventListener("submit", submitCardForm);

