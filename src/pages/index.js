import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupDeleteConfirm from "../components/PopupDeleteConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { config } from "../utils/constants.js";

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

const popupDeleteConfirm = new PopupDeleteConfirm("#popupDelete", (id,card) => {
  api.deleteCard(id)
  card.remove()
  card=null
});
popupDeleteConfirm.setEventListeners();
const popupWithNewPlaceForm = new PopupWithForm("#popupAddCard", (data) => {
  api.createNewCard(data).then((card) => {
    cardList.addItem(createCard(card));
  });
});

const popupWithProfileForm = new PopupWithForm("#popupProfile", (data) => {
  api.editProfie(data);
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
  aboutSelector: ".profile__about",
});

let userId;

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".places"
);

Promise.all([api.getUser(), api.getCards()]).then(([userData, cards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
  cardList.setItems(cards);
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
  const card = new Card(
    data,
    "#card_template",
    (title, image) => {
      popupImage.openPopup(title, image);
    },
    (data,element) => {
      popupDeleteConfirm.openPopup(data._id,element);
    },
    userId
  );
  return card.createElement();
}

formValidationProfile.enableValidation();
formValidationPlace.enableValidation();
