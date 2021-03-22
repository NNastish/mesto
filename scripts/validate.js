const object = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
 };

//Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// // Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// // Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};


const setEventListeners = ( formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass ) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

 
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  
  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
          isValid(formElement, inputElement, inputErrorClass, errorClass);

          toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
  });
};



const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

  return !inputElement.validity.valid;
  });
};



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


const enableValidation = ({ formSelector, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));


  formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass);
  });
};

enableValidation(object);



