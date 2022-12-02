export default class Card {
  constructor(
    data,
    cardTemplate,
    openPopupImage,
    openDeletePopup,
    handleLikeClick,
    userId
  ) {
    this._userId = userId;
    this._data = data;
    this._ownerId = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._openPopupImage = openPopupImage;
    this._openDeletePopup = openDeletePopup;
    this._handleLikeClick = handleLikeClick;
  }

  createElement() {
    this._card = this._teplateElement();
    this._cardImage = this._card.querySelector(".places__img");
    this._cardTitle = this._card.querySelector(".places__title");
    this._buttonLikeCard = this._card.querySelector(".places__like");
    this._likeCounter = this._card.querySelector(".places__like-counter");
    this._buttonDeleteCard = this._card.querySelector(".places__remove");
    this._isLiked = !!(this._data.likes.find(obj => obj._id === this._userId))
    if (this._userId !== this._ownerId) {
      this._buttonDeleteCard.remove();
    }
    if(this._isLiked){
      this._buttonLikeCard.classList.add("places__like_active")
    }
    this._likeCounter.textContent = this._data.likes.length;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._cardTitle.textContent = this._data.name;
    this._setEventListner();
    return this._card;
  }

  _teplateElement() {
    const card = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".places__card")
      .cloneNode(true);
    return card;
  }
  _clickDeleteButtonHandler() {
    this._openPopupImage(this._data.name, this._data.link);
  }

  _clickLikeButtonHandler() {
    this._handleLikeClick(this._isLiked,this._data._id);
    this._buttonLikeCard.classList.toggle("places__like_active");
  }

  _clickCardImageHandler() {
    this._openPopupImage(this._data.name, this._data.link);
  }

  _setEventListner() {
    this._buttonDeleteCard.addEventListener("click", () => {
      this._openDeletePopup(this._data, this._card);
    });

    this._buttonLikeCard.addEventListener("click", () => {
      this._clickLikeButtonHandler();
    });

    this._cardImage.addEventListener("click", () => {
      this._clickCardImageHandler();
    });
  }

  setLike(count) {
    this._buttonLikeCard.classList.add("places__like_active");
    this._likeCounter.textContent = count;
    this._isLiked = true;
  }

  removeLike(count) {
    this._buttonLikeCard.classList.remove("places__like_active");
    this._likeCounter.textContent = count;
    this._isLiked = false;
  }
}
