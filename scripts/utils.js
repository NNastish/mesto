//-------------------------ПОПАП С КАРТИНКОЙ----------------------------

const popupOpenImage = document.querySelector(".popup_type_image"); //выбираем блок с попап с увеличением картинки
const popupPhoto = popupOpenImage.querySelector(".popup__photo"); //выбираем див в попапе, куда попапдет фото из карточки
const popupCaption = popupOpenImage.querySelector(".popup__caption"); //выбираем див, куда попадет название фото из карточки

function closePopup() {
    const openPopup = document.querySelector(".popup_opened"); //нашла открытый попап
    openPopup.classList.remove("popup_opened"); //закрыла
    document.removeEventListener("keydown", closeIfEsc);
}

function closeIfEsc(evt) {
    const openPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
        closePopup(openPopup);
    }
}

function openPopup(popupElement) {
    popupElement.classList.add("popup_opened"); // функция открыть попап
    document.addEventListener("keydown", closeIfEsc);
}

// export {popupCaption, popupPhoto, popupOpenImage, closePopup, openPopup}