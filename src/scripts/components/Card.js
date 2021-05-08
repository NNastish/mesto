//класс создаёт карточку с текстом и ссылкой на изображение

export default class Card {
    //constructor ({name, link}, cardSelector, handleCardCLick)
    constructor(data, cardSelector, handlers) {
        this._photo = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector; // записали селектор в приватное поле
        this._handleCardClick = handlers.handleCardClick;
        this._handleLikeClick = handlers.handleLikeClick;
        this._handleLikeClick = this._handleLikeClick.bind(this);
        this._handleDeleteCard = handlers.handleDeleteCard;
        this._handleDeleteCard = this._handleDeleteCard.bind(this);
        this._id = data._id;
        this._info = data;
        if (data.likes !== undefined) {
            this._likeQuantity = data.likes.length;
        }
    }

    _getTemplate() {
        // вернём DOM-элемент карточки
        return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    }

    _refreshLikeQuantity(num) {
        this._cardLikeQuantity.textContent = Number(this._cardLikeQuantity.textContent) + num;
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
            this._handleLikeClick(this._info);
        });
        this._element.querySelector(".card__delete").addEventListener("click", () => {
            this._handleDeleteCard(this._id);
        });

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__photo");
        this._cardLikeState = this._element.querySelector(".card__like");
        this._cardLikeQuantity = this._element.querySelector(".card__like-numb");
        this._cardLikeQuantity.textContent = this._likeQuantity;
        this._cardImage.src = this._photo;
        this._cardImage.alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;
        this._setEventListeners();
        return this._element;
    }
}
