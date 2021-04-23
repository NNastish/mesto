//import css
import './index.css';
//import utils
import { initialCards, object } from "../scripts/utils/variables.js";
import {popupAddCard, popupEditProfile,
    profileAddButton, profileEditButton} from "../scripts/utils/constants.js";
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

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "template",
            () => {
            const popupWithImage = new PopupWithImage(".popup_type_image");
                popupWithImage.setEventListeners();
                popupWithImage.open(item);
        }); //здесь переделать механику создания, с новой функцией handleCardClick
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }
}, ".cards");
cardsList.renderItems();

const popupAdd = new PopupWithForm(".popup_type_add", (formData) => {
    const card = new Card(formData, "template",
        () => {
            const popupWithImage = new PopupWithImage(".popup_type_image");
            popupWithImage.setEventListeners();
            popupWithImage.open({name, link});
        });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    popupAdd.close();
});

const popupEdit = new PopupWithForm(".popup_type_edit", (formData) => {
    const user = new UserInfo({ userNameSelector: ".profile__title", userInfoSelector: ".profile__text"});
    user.setUserInfo(formData);
    popupEdit.close();
});

function openPopupAdd() {
    cardFormValidator.disableSubmitButton();
    popupAdd.open();
}

function openPopupEdit() {
    profileFormValidator.disableSubmitButton();
    popupEdit.open();
}


profileAddButton.addEventListener("click", openPopupAdd);

profileEditButton.addEventListener("click", openPopupEdit);
