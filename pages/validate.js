const formClassList = {
  formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formClassList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formClassList.errorClass);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formClassList.inputErrorClass);
    errorElement.classList.remove(formClassList.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(formClassList.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(formClassList.inactiveButtonClass);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(formClassList.inputSelector));
    const buttonElement = formElement.querySelector(formClassList.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(formClassList.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };
  
  enableValidation(formClassList);
