import Popup from "./Popup";

export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector, remover) {
    super(popupSelector);
    this._remover = remover;
    this._submitRemoveButton = this._popup.querySelector(".popup__btn-submit");
  }

  openPopup(id,card) {
    this._id = id;
    this._card = card
    super.openPopup();
  }

  setEventListeners() {
    this._submitRemoveButton.addEventListener("click", () => {
      console.log();
      this._remover(this._id,this._card);
      this.closePopup()
    });
    super.setEventListeners();
  }
}
