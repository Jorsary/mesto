export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._configValidation = config;
    this._inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._saveButton = formElement.querySelector(config.submitButtonSelector);
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._configValidation.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.classList.remove(this._configValidation.errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
    
  }

  _disableSubmitButton() {
    this._saveButton.classList.add(this._configValidation.inactiveButtonClass);
    this._saveButton.setAttribute("disabled", true);
  }

  _enableSubmitButton() {
    this._saveButton.classList.remove(
      this._configValidation.inactiveButtonClass
    );
    this._saveButton.removeAttribute("disabled");
  }

  _toggleButtonState(input) {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners(input) {
    input.addEventListener("input", () => {
      this._checkInputValidity(input);
      this._toggleButtonState(input);
    });
  }

  enableValidation() {
    this._inputs.forEach((input) => {
      this._setEventListeners(input);
    });
  }

  resetValidation() {
    this._disableSubmitButton()
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._formElement.reset()
  }
}
