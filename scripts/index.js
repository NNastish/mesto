//-------------------------ПОПАПЫ----------------------------
const popup = document.querySelector(".popup"); //выбираем блок с попап
const popupEditProfile = document.querySelector(".popup_type_edit"); //выбираем второй попап для редактирования по модификатору
const popupAddCard = document.querySelector(".popup_type_add"); //выбираем второй попап для добавления фотографий по модификатору

//-------------------------КНОПКИ-----------------------------

const popupCloseButton = document.querySelectorAll(".popup__close"); //выбираем кнопку закрытия попап
const profileEditButton = document.querySelector("#edit"); //выбираем кнопку редактирования профиля
const profileAddButton = document.querySelector("#add"); //выбираем кнопку добавления фотографии

//-------------------------КНОПКИ ДЛЯ ОТПРАВКИ ФОРМ-------------

const buttonSaveProfileInfo = document.querySelector('#save-button'); //выбираем кнопку, которая отправляет форму редактирования инфо-профиля
const buttonCreateCard = document.querySelector('#create-button'); //выбираем кнопку, которая отправляет форму с данными для добавления карточки

//-------------------------ИНПУТЫ И ДАННЫЕ ДЛЯ ИЗМЕНЕНИЙ-------

const profileTitle = document.querySelector(".profile__title"); //выбираем заголовок, который нужно поменять
const profileText = document.querySelector(".profile__text"); //выбираем параграф, который нужно поменять
const nameInput = document.querySelector("#name"); //выбираем  строку ввода имени, которая будет менять заголовок
const aboutInput = document.querySelector("#about"); //выбираем  строку ввода описания, которая будет менять параграф


//-------------------------ТЕМПЛЭЙТ-----------------------------

const cardTemplate = document.querySelector("#template"); //выбираем темплэйт
const cardsContainer = document.querySelector(".cards"); //выбираем дивчик с карточками

//-------------------------МАССИВ-----------------------------

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

  //--------------------ФУНКЦИИ------------------------



//   function createNewCard(item) {
//       const newItem = cardTemplate.querySelector(".card").cloneNode(true);
//       const cardPhoto = newItem.querySelector(".card__photo");
//       const cardTitle = newItem.querySelector(".card__title");

//       cardTitle.textContent = item.name;
//       cardPhoto.src = item.link;

//       return newItem;

//   }
//     function addInitialCards() { //функция с добавлением карточек в секцию
//         const result = initialCards.map(createNewCard);
//         cardsContainer.prepend(...result);
//   };


  function addNewCard (item) {
    return  `
      <article class="card">
          <img src="${item.link}" alt="${item.name}" class="card__photo" />
          <div class="card__lists">
              <h2 class="card__title">${item.name}</h2>
              <button type="button" class="card__like"></button>
           </div>
      </article>
      `;
  };
  
  function addInitialCards() { //функция с добавлением карточек в секцию

    initialCards.forEach(function(item) {
        let str = addNewCard(item);
        cardsContainer.insertAdjacentHTML("afterbegin", str); 
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
        closePopup(); // закрываем попап
    }
    
    
    function submitCardForm(evt) {
        evt.preventDefault();


        const titleInput = document.querySelector("#input-title"); //выбираем строку ввода названия
        const titleValue = titleInput.value;

        const linkInput = document.querySelector("#input-link"); //выбираем строку ввода ссылки
        const linkValue = linkInput.value;
        // const titleInput = newItem.querySelector("#input-title"); //выбираем строку ввода названия
        // const titleValue = titleInput.value;

        // const linkInput = newItem.querySelector("#input-link"); //выбираем строку ввода ссылки
        // const linkValue = linkInput.value;

        // const newCardForm = createDomNode({ title: titleValue, link: linkValue});
        // cardsContainer.prepend(newCardForm);
        // cardsContainer.insertAdjacentHTML('afterbegin', newCardForm);
        let result = addNewCard({name: titleValue, link: linkValue});
        cardsContainer.insertAdjacentHTML('afterbegin', result);
 
        closePopup();
    } 

    // Nastya's attempt to create card by using template
    function submitViaTemplate(evt) {
        evt.preventDefault();

        let newItem = createNewCard(evt.value);
        const titleInput = newItem.querySelector("#input-title"); //выбираем строку ввода названия
        const titleValue = titleInput.value;

        const linkInput = newItem.querySelector("#input-link"); //выбираем строку ввода ссылки
        const linkValue = linkInput.value;

        closePopup();
    }
    
//-------------------ВЫЗОВ ФУНКЦИИ-------------------------------

addInitialCards(); //вызов функции с добавлением карточек

//-------------------СЛУШАЛКИ СОБЫТИЙ-----------------------------

profileEditButton.addEventListener("click", function() {
    openPopup(popupEditProfile);
}); //действие "клик по кнопке редактирования профиля"

profileAddButton.addEventListener("click", function() {
    openPopup(popupAddCard);
}); //действие "клик по кнопке добавить фото [+] "

popupCloseButton.forEach((button) => button.addEventListener("click", function() {
    closePopup();
})); //действие "клик по кнопке, которое закрывает попапы (редактирования и добавления фото)"

buttonSaveProfileInfo.addEventListener("submit", submitProfileForm); //действие "клик отправить форму на смену данных в профиле редактирования"
buttonCreateCard.addEventListener("submit", submitCardForm); //действие "клик по кнопке добавить фото и название  в карточку "


