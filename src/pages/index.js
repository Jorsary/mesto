import { config, initialCards } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const popupNewPlace = document.querySelector("#popupAddCard");
const newPlaceOpenButton = document.querySelector(".profile__btn-add");
const newPlaceForm = popupNewPlace.querySelector(".popup__form");

const popupProfile = document.querySelector("#popupProfile");
const profileOpenButton = document.querySelector(".profile__btn-edit");

const profileChangeForm = popupProfile.querySelector(".popup__form");

const formValidationProfile = new FormValidator(config, profileChangeForm);
const formValidationPlace = new FormValidator(config, newPlaceForm);

const popupImage = new PopupWithImage("#popupImage");
popupImage.setEventListeners();

const popupWithNewPlaceForm = new PopupWithForm("#popupAddCard", (data) => {
  cardList.addItem(createCard(data));
});

const popupWithProfileForm = new PopupWithForm("#popupProfile", (data) => {
  userInfo.setUserInfo(data);
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".places"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  StatusSelector: ".profile__status",
});

popupWithProfileForm.setEventListeners();
profileOpenButton.addEventListener("click", () => {
  formValidationProfile.resetValidation();
  popupWithProfileForm.setDefaultInputValues(userInfo.getUserInfo());
  popupWithProfileForm.openPopup();
});

popupWithNewPlaceForm.setEventListeners();
newPlaceOpenButton.addEventListener("click", () => {
  popupWithNewPlaceForm.openPopup();
  formValidationPlace.resetValidation();
});

function createCard(data) {
  const card = new Card(data, "#card_template", (title, image) => {
    popupImage.openPopup(title, image);
  });
  return card.createElement();
}

cardList.renderItems();
formValidationProfile.enableValidation();
formValidationPlace.enableValidation();
