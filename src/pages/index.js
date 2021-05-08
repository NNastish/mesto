//import css
import './index.css';
//import utils
import { initialCards, object } from "../scripts/utils/variables.js";
import {popupAddCard, popupEditProfile,
    profileAddButton, profileEditButton,
    popupEditAboutField, popupEditNameField,
    popupAvatarEdit, avatarEditButton} from "../scripts/utils/constants.js";
//import components
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Api from "../scripts/components/Api.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete.js";
import PopupWithAvatar from "../scripts/components/PopupWithAvatar.js";


const user = new UserInfo({ userNameSelector: ".profile__title", userInfoSelector: ".profile__text"});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'f2ba0ce4-9f65-4cd3-b9f2-212aec08ce01',
        'Content-Type': 'application/json'
    }
});

let userId = null;
const userPromise = api.getUserInfo();
userPromise.then((data) => {
    const {name , about, avatar} = data;
    user.setUserInfo({ name, about});
    document.querySelector(".profile__photo").src = avatar;
    userId = data._id;
})

const profileFormValidator = new FormValidator(object, popupEditProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(object, popupAddCard);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(object, popupAvatarEdit);
avatarFormValidator.enableValidation();

const popupEdit = new PopupWithForm(".popup_type_edit", (formData) => {
    api.editProfileInfo(formData)
        .then((data) => {
            user.setUserInfo(data);
        })
        .catch(() => console.log('Ошибка в popupEdit'));
    popupEdit.close();
});

function openPopupEdit() {
    const { userName, userInfo } = user.getUserInfo();
    popupEditAboutField.value = userInfo;
    popupEditNameField.value = userName;
    profileFormValidator.disableSubmitButton();
    popupEdit.open();
}
profileEditButton.addEventListener("click", openPopupEdit);

//--------------------------------AVATAR
const popupAvatar = new PopupWithAvatar(".popup_type_avatar", (formData) => {
    const avatarPromise = api.editAvatar(formData);
    avatarPromise.then((data) => {
        const { avatar } = data;
        document.querySelector(".profile__photo").src = avatar;
    })
        .catch(() => console.log('Ошибка в popupAvatar'));
    popupAvatar.close();
});

function openAvatarForm() {
    avatarFormValidator.disableSubmitButton();
    popupAvatar.open();
}

avatarEditButton.addEventListener("click", openAvatarForm);
//--------------------------------CARD

const cardsPromise = api.getInitialCards();
cardsPromise.then(loadInitialCardsFromServer);

const popupWithImage = new PopupWithImage(".popup_type_image");

function handleLike(info) {
    if (this._cardLikeState.classList.contains("card__like_active")) {
        api.deletelike(info._id).then(this._refreshLikeQuantity(-1));
    } else {
        api.addlike(info._id).then(this._refreshLikeQuantity(1));
    }
    this._cardLike();
}

function isOwner(item) {
    if (userId != null) {
        return userId === item.owner._id;
    }
    return false;
}


function provideDeleteRights(item, cardElement) {
    if (!isOwner(item)) {
        cardElement.querySelector(".card__delete").style.display = 'none';
    }
}



function handleDelete(id) {
    let popupCardDelete = new PopupWithDelete(".popup_type_delete", () => {
        api.deleteCard(id)
        this._cardDelete();
        popupCardDelete.close();
        //!!!!! как лучше удалять instance?
        popupCardDelete = null;
        // popupCardDelete = undefined
        // delete window.this;

    });
    popupCardDelete.open();
}

function createCard(item) {
    const card = new Card(item, "template", {
        handleCardClick: () => {
            popupWithImage.open(item)
        },
        handleLikeClick: handleLike,
        handleDeleteCard: handleDelete
    });
    const cardElem = card.generateCard();
    detectLike(item, cardElem);
    provideDeleteRights(item, cardElem);
    return cardElem;
}

function detectLike(item, cardElement) {
    if (isLiked(item)) {
        cardElement.querySelector(".card__like").classList.add("card__like_active");
    }
}

function isLiked(item) {
    let state = 0;
    item.likes.forEach((user) => {
        if (user._id === userId) {
            state = 1;
        }
    })
    return state === 1;
}


function loadInitialCardsFromServer(data) {
    for (let i = data.length - 1; i >= 0; i -= 1) {
        const cardElement = createCard(data[i]);
        // detectLike(data[i], cardElement);
        cardsList.addItem(cardElement);
    }
}

const cardsList = new Section(".cards");
// const cardsList = new Section({
//     items: [],
//     renderer: (item) => {
//         const cardElement = createCard(item);
//         cardsList.addItem(cardElement);
//     }
// }, ".cards");
// cardsList.renderItems();

const popupAdd = new PopupWithForm(".popup_type_add", (formData) => {
    const cardPromise = api.addCard(formData);
    cardPromise.then((data) => {
        const cardElement = createCard(data);
        cardsList.addItem(cardElement);
    })
        .catch(() => console.log('Ошибка в popupAdd'));
    popupAdd.close();
});


function openPopupAdd() {
    cardFormValidator.disableSubmitButton();
    popupAdd.open();
}

profileAddButton.addEventListener("click", openPopupAdd);
