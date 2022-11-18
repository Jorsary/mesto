import Popup from "../components/Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll('.popup__input'); 
    this._formSumbit = formSubmit;
    
  }

  _getInputValues() {
    const inputValues = {}
    this._inputList.forEach((input)=>{
      inputValues[input.name]=input.value
    })
    return inputValues
  }

  setDefaultInputValues(userData) {
    this._inputList.forEach((input) => {
        input.value = userData[input.name];
    })
}

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formSumbit(this._getInputValues());
      this.closePopup()
    });
    super.setEventListeners();
  }

  closePopup() {

    super.closePopup();
  }
}
