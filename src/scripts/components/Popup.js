export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    //приватный метод - закрывает попап по ESC
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            const openPopup = document.querySelector(".popup_opened");
            openPopup.classList.remove("popup_opened");
            document.removeEventListener("keydown", this._handleEscClose);
        }
    }

    //публичный метод - открывает попап
    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    //публичный метод - закрывает попап
    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    //публичный метод - добавляет слушатель клика иконке закрытия попапа
    setEventListeners() {
        this._popup.querySelector(".popup__close").addEventListener("click", () => this.close())

        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
        });
    }
}
