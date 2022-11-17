import FormValidator from "./FormValidator.js";
import { initialCards } from "./data.js";
import Card from "./Card.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_inactive",
  errorClass: "popup__error_active",
};

const popups = document.querySelectorAll(".popup");

const popupNewPlace = document.querySelector("#popupAddCard");
const newPlaceOpenButton = document.querySelector(".profile__btn-add");
const newPlaceForm = popupNewPlace.querySelector(".popup__form");
const newPlaceInputName = popupNewPlace.querySelector(".popup__input_add_name");
const newPlaceInputLink = popupNewPlace.querySelector(".popup__input_add_link");

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

const formValidationProfile = new FormValidator(config, profileChangeForm);
const formValidationPlace = new FormValidator(config, newPlaceForm);

function renderCard(element) {
  cardsContainer.prepend(element);
}

function createCard(data) {
  const card = new Card(data, "#card_template", openPopupImage);
  return card.createElement();
}

const renderInitialCards = () => {
  initialCards.forEach((data) => {
    const card = createCard(data);
    renderCard(card);
  });
};

renderInitialCards();

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

popupNewPlace.addEventListener("click", handleCloseByOverlay);
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

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__btn-close")) {
      closePopup(popup);
    }
  });
});

function openPopupNewPlace() {
  openPopup(popupNewPlace);
  formValidationPlace.resetValidation();
}

function handlerNewPlace(e) {
  e.preventDefault();
  const cardData = {
    name: newPlaceInputName.value,
    link: newPlaceInputLink.value,
  };
  const card = createCard(cardData);
  renderCard(card);
  closePopup(popupNewPlace);
}

newPlaceOpenButton.addEventListener("click", openPopupNewPlace);
newPlaceForm.addEventListener("submit", handlerNewPlace);

function openPopupEditProfile() {
  formValidationProfile.resetValidation();
  profileInputName.value = profileName.textContent;
  profileInputStatus.value = profileStatus.textContent;
  openPopup(popupProfile);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileInputName.value;
  profileStatus.textContent = profileInputStatus.value;
  closePopup(popupProfile);
}

function openPopupImage(cardTitle, cardImage) {
  popupImage.src = cardImage;
  popupImage.alt = cardTitle;
  popupImageText.textContent = cardTitle;
  openPopup(popupOpenImage);
}

profileOpenButton.addEventListener("click", openPopupEditProfile);
profileChangeForm.addEventListener("submit", handleProfileFormSubmit);

formValidationProfile.enableValidation();
formValidationPlace.enableValidation();
