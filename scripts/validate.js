const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_inactive",
  errorClass: "popup__error_active",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configValidation
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};

const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = "";
};

function resetValidation(formElement, configValidation) {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector)
  );
  const buttonSubmit = formElement.querySelector(
    configValidation.submitButtonSelector
  );
  inputList.forEach((elem) => {
    hideInputError(formElement, elem, configValidation);
  });
  disableSubmitButton(buttonSubmit, configValidation);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableSubmitButton(button, configValidation) {
  button.classList.add(configValidation.inactiveButtonClass);
  button.setAttribute("disabled", true);
}

function enableSubmitButton(button, configValidation) {
  button.classList.remove(configValidation.inactiveButtonClass);
  button.removeAttribute("disabled");
}

function toggleButtonState(inputList, formElement, configValidation) {
  const buttonSubmit = formElement.querySelector(
    configValidation.submitButtonSelector
  );
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonSubmit, configValidation);
  } else {
    enableSubmitButton(buttonSubmit, configValidation);
  }
}

function checkInputValidity(formElement, inputElement, configValidation) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configValidation
    );
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
}

function setEventListeners(formElement, configValidation) {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, formElement, configValidation);
    });
  });
}

function enableValidation(configValidation) {
  const formList = Array.from(
    document.querySelectorAll(configValidation.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, configValidation);
  });
}

enableValidation(config);
