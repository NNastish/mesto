//класс настраивает валидацию полей формы
class FormValidator {
    constructor(object, formElement) {
        this._inputSelector = object.inputSelector;
        this._submitButtonSelector = object.submitButtonSelector;
        this._inactiveButtonClass = object.inactiveButtonClass;
        this._inputErrorClass = object.inputErrorClass;
        this._errorClass = object.errorClass;
        this._formElement = formElement;
    }

    // Функция, которая добавляет класс с ошибкой
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); //находим элементом с ошибкой

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    // Функция, которая удаляет класс с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); //находим элементом с ошибкой

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    // Функция, которая принимает массив
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement); //если поля невалидны, то добавляем классы
        } else {
            this._hideInputError(inputElement); //если поля валидны, то удаляем
        }
    }

    // Функция, которая меняет состояние кнопки
    _toggleButtonState = (inputList, buttonElement) => {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        } else {
            // иначе сделай кнопку активной
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    };

    // Функция со слушалками и обработчиками
    _setValEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); //Делаем массив из элементов внутри формы
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector); //находим кнопку
        this._toggleButtonState(inputList, buttonElement); //вызов функции с массивом и кнопкой и неактивной кнопкой
        // перебираем массив, добавляем слушалку события и проверяем
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);

                this._toggleButtonState(inputList, buttonElement); //вызов функции с массивом и кнопкой
            });
        });
    }

    disableSubmitButton() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setValEventListeners();
    }
}

export { FormValidator};
