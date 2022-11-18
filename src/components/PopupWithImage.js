import Popup from "../components/Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__text');
  }
  openPopup(title,image) {
    this._popupTitle.textContent = title;
    this._popupImage.alt = title;
    this._popupImage.src = image;
    super.openPopup();
}
}