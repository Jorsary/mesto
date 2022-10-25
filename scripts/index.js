const popupAddCard = document.querySelector("#popupAddCard");
const addCardOpenButton = document.querySelector(".profile__btn-add");
const addCardForm = popupAddCard.querySelector(".popup__form");
const addCardInputName = popupAddCard.querySelector(".popup__input_add_name");
const addCardInputLink = popupAddCard.querySelector(".popup__input_add_link");

const popupProfile = document.querySelector("#popupProfile");
const profileOpenButton = document.querySelector(".profile__btn-edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileInputName = popupProfile.querySelector(".popup__input_edit_name");
const profileInputStatus = popupProfile.querySelector(
  ".popup__input_edit_status"
);
const profileChangeForm = popupProfile.querySelector(".popup__form");

const popupOpenImage = document.querySelector("#popupImage");
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupImageText = popupOpenImage.querySelector(".popup__text");

const cardsContainer = document.querySelector(".places");
const cardTemplate = document.querySelector("#card_template").content;

const closeButtons = document.querySelectorAll(".popup__btn-close");
const createCard = (cardData) => {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".places__img");
  const cardTitle = card.querySelector(".places__title");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  const buttonDeleteCard = card.querySelector(".places__remove");
  buttonDeleteCard.addEventListener("click", removeCard);
  const buttonLikeCard = card.querySelector(".places__like");
  buttonLikeCard.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () => {
    openPopupImage(cardImage, cardTitle);
  });
  return card;
};

function renderCard(element) {
  cardsContainer.prepend(element);
}

const renderInitialCards = () => {
  initialCards.forEach((element) => {
    const newCard = createCard(element);
    renderCard(newCard);
  });
};

renderInitialCards();

function removeCard(e) {
  const targetCard = e.target.closest(".places__card");
  targetCard.remove();
}

function likeCard(e) {
  e.target.classList.toggle("places__like_active");
}

const handleCloseByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const handleCloseByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

popupAddCard.addEventListener("click", handleCloseByOverlay);
popupOpenImage.addEventListener("click", handleCloseByOverlay);
popupProfile.addEventListener("click", handleCloseByOverlay);

const openPopup = (popupName) => {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", handleCloseByEsc);
};
const closePopup = (popupName) => {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleCloseByEsc);
};

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function openPopupAddCard() {
  openPopup(popupAddCard);
  resetValidation(addCardForm, config);
  addCardForm.reset();
}

function closePopupAddCard() {
  closePopup(popupAddCard);
}

function handlerAddCard(e) {
  e.preventDefault();
  const cardData = {
    name: addCardInputName.value,
    link: addCardInputLink.value,
  };
  const newCard = createCard(cardData);
  renderCard(newCard);
  closePopupAddCard();
}

addCardOpenButton.addEventListener("click", openPopupAddCard);
addCardForm.addEventListener("submit", handlerAddCard);

function openPopupEditProfile() {
  profileInputName.value = profileName.textContent;
  profileInputStatus.value = profileStatus.textContent;
  resetValidation(profileChangeForm, config);
  openPopup(popupProfile);
}

function closePopupEditProfile() {
  closePopup(popupProfile);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileInputName.value;
  profileStatus.textContent = profileInputStatus.value;
  closePopupEditProfile();
}

function openPopupImage(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.textContent;
  popupImageText.textContent = cardTitle.textContent;
  openPopup(popupOpenImage);
}

profileOpenButton.addEventListener("click", openPopupEditProfile);
profileChangeForm.addEventListener("submit", handleProfileFormSubmit);
