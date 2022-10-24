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

function resetValidation(popupName,configValidation) {
  const formElement = popupName.querySelector(configValidation.formSelector)
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector))
  inputList.forEach((elem)=>{
    hideInputError(formElement,elem,configValidation)
  })
}

function checkFormValidity(inputList, formElement, configValidation) {
  const buttonSubmit = formElement.querySelector(
    configValidation.submitButtonSelector
  );
  if (
    inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  ) {
    buttonSubmit.classList.add(configValidation.inactiveButtonClass);
    buttonSubmit.setAttribute("disabled", true);
  } else {
    buttonSubmit.classList.remove(configValidation.inactiveButtonClass);
    buttonSubmit.removeAttribute("disabled");
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
      checkFormValidity(inputList, formElement, configValidation);
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
