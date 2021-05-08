import Popup from './Popup.js';

//класс PopupWithDelete, который наследует от Popup

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, cardDelete) {
        super(popupSelector);
        this._cardDelete = cardDelete;
        this._form = this._popup.querySelector(".form");
        this._setEventListeners();
        // this._popupDelete = this._popup.querySelector('.popup_type_delete')
    }

    _setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._cardDelete();
        })
    }
}