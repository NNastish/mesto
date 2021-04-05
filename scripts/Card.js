import { openPopup } from "./utils.js";

//класс создаёт карточку с текстом и ссылкой на изображение

export class Card {
    _popupOpenImage = document.querySelector(".popup_type_image"); //выбираем блок с попап с увеличением картинки
    _popupPhoto = this._popupOpenImage.querySelector(".popup__photo"); //выбираем див в попапе, куда попапдет фото из карточки
    _popupCaption = this._popupOpenImage.querySelector(".popup__caption"); //выбираем див, куда попадет название фото из карточки

    constructor(data, cardSelector) {
        this._photo = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector; // записали селектор в приватное поле
    }

    _getTemplate() {
        // вернём DOM-элемент карточки
        return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    }

    _cardLike() {
        this._element.querySelector(".card__like").classList.toggle("card__like_active"); //добавляем лайк
    }

    _cardDelete() {
        this._element.remove(); //удаляем карточки
    }

    _cardPopup() {
        this._popupPhoto.src = this._photo;
        this._popupPhoto.alt = this._title;
        this._popupCaption.textContent = this._title;
        openPopup(this._popupOpenImage);
    }

    // Функция обработки событий
    _setEventListeners() {
        this._element.querySelector(".card__like").addEventListener("click", () => {
            this._cardLike();
        });
        this._element.querySelector(".card__delete").addEventListener("click", () => {
            this._cardDelete();
        });

        this._element.querySelector(".card__photo").addEventListener("click", () => {
            this._cardPopup();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector(".card__photo").src = this._photo;
        this._element.querySelector(".card__photo").alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;

        this._setEventListeners();

        return this._element;
    }
}
