//-------------------------ПОПАП С КАРТИНКОЙ----------------------------

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

export { closePopup, openPopup };
