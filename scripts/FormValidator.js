
export class FormValidator {
    constructor (object, formElement) {
        this._formElement = formElement
        this._formSelector = object.formSelector
        this._inputSelector = object.inputSelector
        this._submitButtonSelector = object.submitButtonSelector
        this._inactiveButtonClass = object.inactiveButtonClass
        this._inputErrorClass = object.inputErrorClass
        this._errorClass = object.errorClass

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._formList = Array.from(document.querySelectorAll(this._formSelector));
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
      
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
    
    
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };

    _setEventListeners = () => {
        this._toggleButtonState();
        
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });
      };

      enableValidation () {
        
        this._formList.forEach(() => {
            this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
          });
          this._setEventListeners();
        });
      };
      
      setSubmitButtonState () {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
        }
}