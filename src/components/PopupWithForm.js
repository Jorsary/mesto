import Popup from "../components/Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formSumbit = formSubmit;
    this._submitButton = this._form.querySelector(".popup__btn-submit");
    this._initButtonText = this._submitButton.textContent
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setDefaultInputValues(userData) {
    this._inputList.forEach((input) => {
      input.value = userData[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitButton.textContent = "Сохранение...";
      this._formSumbit(this._getInputValues()).then(() => {
        this.closePopup();
      }).catch((err)=>{
        console.error(err)
      })
    });
    super.setEventListeners();
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }
  openPopup() {
    this._submitButton.textContent = this._initButtonText
    super.openPopup();
  }
}
