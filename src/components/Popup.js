export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector)
  }

  openPopup(){
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }
  closePopup(){
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(e){
    if (e.key === "Escape"){
      this.closePopup();
    }
  }
  setEventListeners(){
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup_opened") || e.target.classList.contains("popup__btn-close")) {
        this.closePopup();
      } 
    });
  }
}

