const popupOpenButton = document.querySelector(".profile__btn-edit");
const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupCloseButton = popup.querySelector(".popup__btn-close");
const popupInputName = popup.querySelector(".popup__input_edit_name");
const popupInputStatus = popup.querySelector(".popup__input_edit_status");
const popupSubmitButton = popup.querySelector(".popup__btn-submit");
const places = document.querySelector(".places");
const cardTemplate = document.querySelector("#card_template").content;

const createElement = (name, link) => {
  const card = cardTemplate.querySelector(".places__card").cloneNode(true);
  card.querySelector(".places__img").src = link;
  card.querySelector(".places__title").textContent = name;
  places.prepend(card);
};

const renderCard = () => {
  initialCards.forEach((element) => {
    createElement(element.name, element.link);
  });
};
renderCard();

function openPopupEditProfile() {
  popupInputName.value = profileName.textContent;
  popupInputStatus.value = profileStatus.textContent;
  popup.classList.add("popup_opened");
}

function closePopupEditProfile() {
  popup.classList.remove("popup_opened");
}

function handlerSubmitForm(e) {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileStatus.textContent = popupInputStatus.value;
  closePopupEditProfile();
}

popupOpenButton.addEventListener("click", openPopupEditProfile);

popupCloseButton.addEventListener("click", closePopupEditProfile);

popupSubmitButton.addEventListener("click", handlerSubmitForm);
