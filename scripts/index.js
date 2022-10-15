const popupAddCard = document.querySelector("#popupAddCard");
const addCardOpenButton = document.querySelector(".profile__btn-add");
const addCardForm = popupAddCard.querySelector(".popup__form");
const addCardInputName = popupAddCard.querySelector(".popup__input_add_name");
const addCardInputLink = popupAddCard.querySelector(".popup__input_add_link");
const addCardSubmitButton = popupAddCard.querySelector(".popup__btn-submit");

const popupProfile = document.querySelector("#popupProfile");
const profileOpenButton = document.querySelector(".profile__btn-edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileInputName = popupProfile.querySelector(".popup__input_edit_name");
const profileInputStatus = popupProfile.querySelector(
  ".popup__input_edit_status"
);
const profileChangeForm = popupProfile.querySelector(".popup__form");

const places = document.querySelector(".places");
const cardTemplate = document.querySelector("#card_template").content;

const popupOpenImage = document.querySelector("#popupImage");
const popupImage = popupOpenImage.querySelector(".popup__image");
const popupImageText = popupOpenImage.querySelector(".popup__text");

const closeButtons = document.querySelectorAll(".popup__btn-close");

const createCard = (name, link) => {
  const card = cardTemplate.querySelector(".places__card").cloneNode(true);
  const cardImage = card.querySelector(".places__img");
  const cardText = card.querySelector(".places__title");
  card.querySelector(".places__img").src = link;
  card.querySelector(".places__img").alt = name;
  card.querySelector(".places__title").textContent = name;
  const handlerRemoveCard = card.querySelector(".places__remove");
  handlerRemoveCard.addEventListener("click", removeCard);
  const handlerLike = card.querySelector(".places__like");
  handlerLike.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardText.textContent;
    popupImageText.textContent = cardText.textContent;
    openPopup(popupOpenImage);
  });
  return card;
};

function addNewElement(element) {
  places.prepend(element);
}

const renderCard = () => {
  initialCards.forEach((element) => {
    const newCard = createCard(element.name, element.link);
    addNewElement(newCard);
  });
};

renderCard();

function removeCard(e) {
  const targetCard = e.target.closest(".places__card");
  targetCard.remove();
}

function likeCard(e) {
  e.target.classList.toggle("places__like_active");
}

const openPopup = (popupName) => {
  popupName.classList.add("popup_opened");
};
const closePopup = (popupName) => {
  popupName.classList.remove("popup_opened");
};

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function openPopupAddCard() {
  openPopup(popupAddCard);
  addCardForm.reset();
}

function closePopupAddCard() {
  closePopup(popupAddCard);
}

function handlerAddCard(e) {
  e.preventDefault();
  const newCard = createCard(addCardInputName.value, addCardInputLink.value);
  addNewElement(newCard);
  closePopupAddCard();
}

addCardOpenButton.addEventListener("click", openPopupAddCard);
addCardForm.addEventListener("submit", handlerAddCard);

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
profileChangeForm.addEventListener("submit", handlerSubmitForm);
