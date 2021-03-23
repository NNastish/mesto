//проба по тренажеру//
//объект со всеми нужными классами и селекторами
const object = {
  formSelector: ".form", //див с формой
  inputSelector: ".form__input", //поле ввода
  submitButtonSelector: ".form__button", //кнопка
  inactiveButtonClass: "form__button_disabled", //кнопка_неактивна
  inputErrorClass: "form__input_type_error", //спан с ошибкой
  errorClass: "form__input-error_visible", //свойство, меняющее видимость спана
};

//Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass); //если поля невалидны, то добавляем классы
  } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass); //если поля валидны, то удаляем
  }
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //находим элементом с ошибкой

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //находим элементом с ошибкой

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

// Функция со слушалками и обработчиками
const setEventListeners = (formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //Делаем массив из элементов внутри формы
  const buttonElement = formElement.querySelector(submitButtonSelector); //находим кнопку

  toggleButtonState(inputList, buttonElement, inactiveButtonClass); //вызов функции с массивом и кнопкой и неактивной кнопкой

  // перебираем массив, добавляем слушалку события и проверяем
  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
          isValid(formElement, inputElement, inputErrorClass, errorClass);

          toggleButtonState(inputList, buttonElement, inactiveButtonClass); //вызов функции с массивом и кнопкой
      });
  });
};

// Функция, которая принимает массив
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

// Функция, которая меняет состояние кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
  } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
  }
};
// Функция, которая ищет все формы на странице
const enableValidation = ({ formSelector, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); // делаем массив

  // перебрать массив
  formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
          evt.preventDefault(); // отмена стандартного реагирования браузера
      });
      setEventListeners(formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass); //вызов функции с переданными элементами
  });
};

// вызов функции

enableValidation(object);
