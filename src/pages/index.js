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

const formValidators = {};

const avatar = document.querySelector(".profile__avatar");

const popupNewPlace = document.querySelector("#popupAddCard");
const newPlaceOpenButton = document.querySelector(".profile__btn-add");
const newPlaceForm = popupNewPlace.querySelector(".popup__form");

const popupProfile = document.querySelector("#popupProfile");
const profileOpenButton = document.querySelector(".profile__btn-edit");

const profileChangeForm = popupProfile.querySelector(".popup__form");

const popupAvatar = document.querySelector("#popupAvatar");
const avatarForm = popupAvatar.querySelector(".popup__form");

const popupImage = new PopupWithImage("#popupImage");
popupImage.setEventListeners();

const popupDeleteConfirm = new PopupDeleteConfirm(
  "#popupDelete",
  async (id, card) => {
    api
      .deleteCard(id)
      .then(() => {
        card.remove();
        card = null;
      })
      .catch((err) => {
        console.error(err);
      });
  }
);
popupDeleteConfirm.setEventListeners();

const popupWithNewPlaceForm = new PopupWithForm(
  "#popupAddCard",
  async (data) => {
    return api
      .createNewCard(data)
      .then((card) => {
        cardList.addItem(card);
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

const popupWithProfileForm = new PopupWithForm(
  "#popupProfile",
  async (data) => {
    return api
      .editProfie(data)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

const popupWithAvatarForm = new PopupWithForm("#popupAvatar", async (data) => {
  return api
    .editAvatar({ avatar: data.avatar })
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.error(err);
    });
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
  avatarSelector: ".profile__avatar-image",
});

let userId;

const cardList = new Section(
  {
    renderer: (data) => {
      const card = new Card(
        data,
        "#card_template",
        (title, image) => {
          popupImage.openPopup(title, image);
        },
        (data, element) => {
          popupDeleteConfirm.openPopup(data._id, element);
        },
        (isLiked, id) => {
          if (isLiked) {
            api
              .removeLike(id)
              .then((data) => {
                card.removeLike(data.likes.length);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            api
              .setLike(id)
              .then((data) => {
                card.setLike(data.likes.length);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
        userId
      );
      return card.createElement();
    },
  },
  ".places"
);

Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.setItems(cards);
    cardList.renderItems();
  })
  .catch((error) => console.error(error));

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

popupWithProfileForm.setEventListeners();
profileOpenButton.addEventListener("click", () => {
  formValidators["formEditProfile"].resetValidation();
  popupWithProfileForm.setDefaultInputValues(userInfo.getUserInfo());
  popupWithProfileForm.openPopup();
});

popupWithNewPlaceForm.setEventListeners();
newPlaceOpenButton.addEventListener("click", () => {
  popupWithNewPlaceForm.openPopup();
  formValidators["formAddCard"].resetValidation();
});

popupWithAvatarForm.setEventListeners();
avatar.addEventListener("click", () => {
  popupWithAvatarForm.openPopup();
  formValidators["formAvatar"].resetValidation();
});
