//класс создаёт карточку с текстом и ссылкой на изображение

export default class Card {
    constructor(data, cardSelector, handlers, userId) {
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
        this._userId = userId;
        if (data.likes !== undefined) {
            this._likeQuantity = data.likes.length;
        }
    }

    _isLiked(likes) {
        let state = 0;
        likes.forEach((user) => {
            if (user._id === this._userId) {
                state = 1;
            }
        })
        return state === 1;
    }

    _detectLike(likes) {
        if (this._isLiked(likes)) {
            this._cardLikeState.classList.add("card__like_active");
        }
    }

    _refreshLikeQuantity(num) {
        this._cardLikeQuantity.textContent = Number(this._cardLikeQuantity.textContent) + num;
    }

    _alreadyLiked() {
        return this._cardLikeState.classList.contains("card__like_active");
    }

    _isOwner(owner) {
        return this._userId === owner._id;
    }

    _provideDeleteRights(owner) {
        if (!this._isOwner(owner)) {
            this._cardDeleteButton.style.display = 'none';
        }
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
        this._cardLikeState.addEventListener("click", () => {
            this._handleLikeClick(this._info._id);
        });
        this._cardDeleteButton.addEventListener("click", () => {
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
        this._cardDeleteButton = this._element.querySelector(".card__delete");
        this._cardLikeQuantity.textContent = this._likeQuantity;
        this._cardImage.src = this._photo;
        this._cardImage.alt = this._title;
        this._element.querySelector(".card__title").textContent = this._title;
        this._setEventListeners();
        this._detectLike(this._info.likes);
        this._provideDeleteRights(this._info.owner);
        return this._element;
    }
}
