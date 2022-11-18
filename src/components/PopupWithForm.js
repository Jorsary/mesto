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

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this._getInputValues())
      this._formSumbit(this._getInputValues());
    });
    super.setEventListeners();
  }
  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}
