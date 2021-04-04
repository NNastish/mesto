// import {popupCaption, popupOpenImage, popupPhoto, openPopup} from "./utils"

//класс создаёт карточку с текстом и ссылкой на изображение
class Card {

    // const popupPhoto = popupOpenImage.querySelector(".popup__photo"); //выбираем див в попапе, куда попапдет фото из карточки
    // const popupCaption = popupOpenImage.querySelector(".popup__caption"); //выбираем див, куда попадет название фото из карточки

    constructor(data, cardSelector) {
        this._photo = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector; // записали селектор в приватное поле

    }

    _getTemplate() {
        // вернём DOM-элемент карточки
        return document.querySelector(this._cardSelector)
            .content.querySelector(".card").cloneNode(true);
    }

    _cardLike() {
        this._element.querySelector(".card__like").classList.toggle("card__like_active"); //добавляем лайк
    }

    _cardDelete() {
        this._element.remove(); //удаляем карточки
    }

    _cardPopup() {
        popupPhoto.src = this._photo;
        popupPhoto.alt = this._title;
        popupCaption.textContent = this._title;
        openPopup(popupOpenImage);
    }

    // Функция обработки событий
    _setEventListeners() {
        this._element.querySelector(".card__like").addEventListener("click", () => {
            this._cardLike();
        });
        this._element.querySelector(".card__delete").addEventListener("click", () => {
            this._cardDelete();
        })

        this._element.querySelector(".card__photo").addEventListener("click", () => {
            this._cardPopup();
        })
    };

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector(".card__photo").src = this._photo;
        this._element.querySelector(".card__photo").alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;

        this._setEventListeners();
        //не хватает слушателя событий на саму карту

        return this._element;
    }
};

// initialCards.forEach((item) => {
//    // Создадим экземпляр карточки
//    const card = new Card(item, "#template");
//    // Создаём карточку и возвращаем наружу
//    const cardElement = card.generateCard();
//
//    // Добавляем в DOM
//    document.querySelector(".cards").append(cardElement);
//  });

