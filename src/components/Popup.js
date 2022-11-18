export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector)
  }

  openPopup(){
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  closePopup(){
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(){
    if (evt.key === "Escape") {
      this._closePopup();
    }
  }
  setEventListeners(){
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__btn-close")) {
        closePopup();
      } 
    });
  }
}

