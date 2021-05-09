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


const user = new UserInfo({ userNameSelector: ".profile__title", userInfoSelector: ".profile__text"});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        authorization: 'f2ba0ce4-9f65-4cd3-b9f2-212aec08ce01',
        'Content-Type': 'application/json'
    }
});

let userId = null;

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then(firstDrawingPage)
    .catch(showErrorStatus)

function firstDrawingPage(data) {
    loadUserProfile(data[0]);
    loadInitialCardsFromServer(data[1]);
}

function showErrorStatus(error) {
    console.log(`Ошибка: ${error.status}`)
}

function loadUserProfile(data) {
    const {name , about, avatar} = data;
    user.setUserInfo({ name, about});
    document.querySelector(".profile__photo").src = avatar;
    userId = data._id;
}

const profileFormValidator = new FormValidator(object, popupEditProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(object, popupAddCard);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(object, popupAvatarEdit);
avatarFormValidator.enableValidation();

function renderLoading(selector, boolean) {
    let button = document.querySelector(selector).querySelector(".form__button");
    if (boolean) {
        button.textContent = "Сохранение...";
        button.classList.add("form__button_disabled");
    } else {
        button.textContent = "Сохранить";
    }
    button = null;
}


const popupEdit = new PopupWithForm(".popup_type_edit", (formData) => {
    renderLoading(".popup_type_edit", true);
    api.editProfileInfo(formData)
        .then((data) => {
            user.setUserInfo(data);
            popupEdit.close();
        })
        .catch(() => console.log('Ошибка в popupEdit'))
        .finally(() => {
            renderLoading(".popup_type_edit", false);
        });
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
const popupAvatar = new PopupWithForm(".popup_type_avatar", (formData) => {
    renderLoading(".popup_type_avatar", true);
    api.editAvatar(formData)
        .then((data) => {
            const { avatar } = data;
            document.querySelector(".profile__photo").src = avatar;
        })
        .catch(() => console.log('Ошибка в popupAvatar'))
        .finally(() => {
            popupAvatar.close();
            renderLoading(".popup_type_avatar", false);
        });
});

function openAvatarForm() {
    avatarFormValidator.disableSubmitButton();
    popupAvatar.open();
}

avatarEditButton.addEventListener("click", openAvatarForm);
//--------------------------------CARD



const popupWithImage = new PopupWithImage(".popup_type_image");


function handleLike(id) {
    if (this._alreadyLiked()) {
        api.deletelike(id)
            .then(this._refreshLikeQuantity(-1))
            .catch(showErrorStatus);
    } else {
        api.addlike(id)
            .then(this._refreshLikeQuantity(1))
            .catch(showErrorStatus)
    }
    this._cardLike();
}

const popupCardDelete = new PopupWithDelete(".popup_type_delete");

function handleDelete(id) {
    popupCardDelete.open(() => {
        api.deleteCard(id)
            .then(() => {
                this._cardDelete();
                popupCardDelete.close();
            })
            .catch(showErrorStatus);
    })
}

function createCard(item) {
    const card = new Card(item, "template", {
        handleCardClick: () => {
            popupWithImage.open(item)
        },
        handleLikeClick: handleLike,
        handleDeleteCard: handleDelete
    }, userId);
    return card.generateCard();
}

function loadInitialCardsFromServer(data) {
    for (let i = data.length - 1; i >= 0; i -= 1) {
        const cardElement = createCard(data[i]);
        cardsList.addItem(cardElement);
    }
}

const cardsList = new Section(".cards");

const popupAdd = new PopupWithForm(".popup_type_add", (formData) => {
    renderLoading(".popup_type_add", true);
    api.addCard(formData)
        .then((data) => {
            const cardElement = createCard(data);
            cardsList.addItem(cardElement);
            popupAdd.close();
        })
        .catch(showErrorStatus)
        .finally(() => {
            renderLoading(".popup_type_add", false);
        })
});


function openPopupAdd() {
    cardFormValidator.disableSubmitButton();
    popupAdd.open();
}

profileAddButton.addEventListener("click", openPopupAdd);
