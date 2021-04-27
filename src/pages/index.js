//import css
import './index.css';
//import utils
import { initialCards, object } from "../scripts/utils/variables.js";
import {popupAddCard, popupEditProfile,
    profileAddButton, profileEditButton,
    popupEditAboutField, popupEditNameField} from "../scripts/utils/constants.js";
//import components
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";


const profileFormValidator = new FormValidator(object, popupEditProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(object, popupAddCard);
cardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_image");

function createCard(item) {
    const card = new Card(item, "template",
        () => popupWithImage.open(item));
    return card.generateCard();
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
    }
}, ".cards");
cardsList.renderItems();

const popupAdd = new PopupWithForm(".popup_type_add", (formData) => {
    const cardElement = createCard(formData);
    cardsList.addItem(cardElement);
    popupAdd.close();
});

const user = new UserInfo({ userNameSelector: ".profile__title", userInfoSelector: ".profile__text"});

const popupEdit = new PopupWithForm(".popup_type_edit", (formData) => {
    user.setUserInfo(formData);
    popupEdit.close();
});

function openPopupAdd() {
    cardFormValidator.disableSubmitButton();
    popupAdd.open();
}

function openPopupEdit() {
    const { userName, userInfo } = user.getUserInfo();
    popupEditAboutField.value = userInfo;
    popupEditNameField.value = userName;
    profileFormValidator.disableSubmitButton();
    popupEdit.open();
}


profileAddButton.addEventListener("click", openPopupAdd);

profileEditButton.addEventListener("click", openPopupEdit);
