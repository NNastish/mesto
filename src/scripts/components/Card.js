//класс создаёт карточку с текстом и ссылкой на изображение

export default class Card {

    constructor({ name, link }, cardSelector, handleCardClick) {
        this._photo = link;
        this._title = name;
        this._cardSelector = cardSelector; // записали селектор в приватное поле
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        // вернём DOM-элемент карточки
        return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    }

    _cardLike() {
        this._cardLikeState.classList.toggle("card__like_active"); //добавляем лайк
    }

    _cardDelete() {
        this._element.remove(); //удаляем карточки
    }

    // Функция обработки событий
    _setEventListeners() {
        this._element.querySelector(".card__like").addEventListener("click", () => {
            this._cardLike();
        });
        this._element.querySelector(".card__delete").addEventListener("click", () => {
            this._cardDelete();
        });

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__photo");
        this._cardLikeState = this._element.querySelector(".card__like");
        this._cardImage.src = this._photo;
        this._cardImage.alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;

        this._setEventListeners();

        return this._element;
    }
}
