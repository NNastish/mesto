//-------------------------ПОПАПЫ----------------------------
export const popupEditProfile = document.querySelector(".popup_type_edit"); //выбираем второй попап для редактирования по модификатору
export const popupAddCard = document.querySelector(".popup_type_add"); //выбираем второй попап для добавления фотографий по модификатору
export const popupAvatarEdit = document.querySelector(".popup_type_avatar");
export const popupEditNameField = popupEditProfile.querySelector("#name");
export const popupEditAboutField = popupEditProfile.querySelector("#about");

//-------------------------КНОПКИ-----------------------------

export const profileEditButton = document.querySelector("#edit"); //выбираем кнопку редактирования профиля
export const profileAddButton = document.querySelector("#add"); //выбираем кнопку добавления фотографии
export const avatarEditButton = document.querySelector(".profile__avatar-overlay");