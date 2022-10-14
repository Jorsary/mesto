const popupAddCard = document.querySelector("#popupAddCard");
const addCardOpenButton = document.querySelector(".profile__btn-add");
const addCardCloseButton = popupAddCard.querySelector(".popup__btn-close");
const formAddCard = popupAddCard.querySelector(".popup__form");
const addCardInputName = popupAddCard.querySelector(".popup__input_add_name");
const addCardInputLink = popupAddCard.querySelector(".popup__input_add_link");
const addCardSubmitButton = popupAddCard.querySelector(".popup__btn-submit");

const popupProfile = document.querySelector("#popupProfile");
const profileOpenButton = document.querySelector(".profile__btn-edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileCloseButton = popupProfile.querySelector(".popup__btn-close");
const profileInputName = popupProfile.querySelector(".popup__input_edit_name");
const profileInputStatus = popupProfile.querySelector(
  ".popup__input_edit_status"
);
const profileSubmitButton = popupProfile.querySelector(".popup__btn-submit");

const places = document.querySelector(".places");
const cardTemplate = document.querySelector("#card_template").content;

const createElement = (name, link) => {
  const card = cardTemplate.querySelector(".places__card").cloneNode(true);
  card.querySelector(".places__img").src = link;
  card.querySelector(".places__title").textContent = name;
  const handlerRemoveCard = card.querySelector(".places__remove");
  handlerRemoveCard.addEventListener("click", removeCard);
  const handlerLike = card.querySelector(".places__like")
  handlerLike.addEventListener("click", likeCard);
  places.prepend(card);
};

const renderCard = () => {
  initialCards.forEach((element) => {
    createElement(element.name, element.link);
  });
};

renderCard();

function removeCard(e) {
  const targetCard = e.target.closest(".places__card");
  targetCard.remove();
}

function likeCard(e) {
  e.target.classList.toggle('places__like_active')
}


const openPopup = (popupName) => {
  console.log(popupName)
  popupName.classList.add("popup_opened");
};
const closePopup = (popupName) => {
  popupName.classList.remove("popup_opened");
};

function openPopupAddCard() {
  openPopup(popupAddCard);
}

function closePopupAddCard() {
  closePopup(popupAddCard);
  formAddCard.reset();
}

function handlerAddCard(e) {
  e.preventDefault();
  createElement(addCardInputName.value, addCardInputLink.value);
  closePopupAddCard();
}

addCardOpenButton.addEventListener("click", openPopupAddCard);
addCardCloseButton.addEventListener("click", closePopupAddCard);
formAddCard.addEventListener("submit", handlerAddCard);

function openPopupEditProfile() {
  profileInputName.value = profileName.textContent;
  profileInputStatus.value = profileStatus.textContent;
  openPopup(popupProfile);
}

function closePopupEditProfile() {
  closePopup(popupProfile);
}

function handlerSubmitForm(e) {
  e.preventDefault();
  profileName.textContent = profileInputName.value;
  profileStatus.textContent = profileInputStatus.value;
  closePopupEditProfile();
}

profileOpenButton.addEventListener("click", openPopupEditProfile);
profileCloseButton.addEventListener("click", closePopupEditProfile);
profileSubmitButton.addEventListener("click", handlerSubmitForm);
