import Popup from './Popup.js';

//класс PopupWithDelete, который наследует от Popup

export default class PopupWithAvatar extends Popup {
    constructor(popupSelector, editAvatar) {
        super(popupSelector);
        this._editAvatar = editAvatar;
        this._inputForm = this._popup.querySelector(".form__input");
        this._form = this._popup.querySelector(".form");
        this._setEventListeners();
        // this._popupDelete = this._popup.querySelector('.popup_type_delete')
    }

    _getInputValue() {
        // создаём пустой объект
        this._formValue = {};

        this._formValue[this._inputForm.name] = this._inputForm.value;
        return this._formValue;
    }

    _setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._editAvatar(this._getInputValue());
        })
    }

    changePhoto() {

    }
}