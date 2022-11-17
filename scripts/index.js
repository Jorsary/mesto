import FormValidator from './FormValidator.js'
import { initialCards } from './data.js'
import Card from './Card.js';
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_inactive",
  errorClass: "popup__error_active",
};
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

const closeButtons = document.querySelectorAll(".popup__btn-close");

const formValidationProfile = new FormValidator(config,profileChangeForm)
const formValidationPlace = new FormValidator(config,addCardForm)


function renderCard(element) {
  cardsContainer.prepend(element);
}

function createCard(data){
  const card = new Card(data,'#card_template',openPopupImage)
  renderCard(card.createElement());
}

const renderInitialCards = () => {
  initialCards.forEach((data) => {
    createCard(data)
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
  formValidationPlace.resetValidation()
  
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
  createCard(cardData)
  closePopupAddCard();
}

addCardOpenButton.addEventListener("click", openPopupAddCard);
addCardForm.addEventListener("submit", handlerAddCard);

function openPopupEditProfile() {
  formValidationProfile.resetValidation()
  profileInputName.value = profileName.textContent;
  profileInputStatus.value = profileStatus.textContent;
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

function openPopupImage(cardTitle,cardImage) {
  console.log(cardTitle)
  popupImage.src = cardImage
  popupImage.alt = cardTitle
  popupImageText.textContent = cardTitle
  openPopup(popupOpenImage);
}

profileOpenButton.addEventListener("click", openPopupEditProfile);
profileChangeForm.addEventListener("submit", handleProfileFormSubmit);


formValidationProfile.enableValidation();
formValidationPlace.enableValidation();