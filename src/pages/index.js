import { config, initialCards } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
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

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "35b8e50a-93b4-49fb-ba9a-8eaf2ad678c9",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  StatusSelector: ".profile__status",
});

Promise.all([api.getUser(), api.getCards()]).then(([userData, cards]) => {
  userInfo.setUserInfo(userData)
  const cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        cardList.addItem(createCard(item));
      },
    },
    ".places"
  );
  cardList.renderItems();
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

formValidationProfile.enableValidation();
formValidationPlace.enableValidation();
