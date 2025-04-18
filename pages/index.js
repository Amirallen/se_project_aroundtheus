/* -------------------------------------------------------------------------- */
/*                                  DREAM ON                                  */
/* -------------------------------------------------------------------------- */
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#profile-modal-close-button"
);
const closeButtons = document.querySelectorAll(".modal__close-button");
const modalNameInput = profileEditModal.querySelector("#modal-title");
const profileModalForm = document.forms["profile-modal-form"];
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modalDescriptionInput =
  profileEditModal.querySelector("#modal-description");
const cardListElement = document.querySelector("#cards-list");
const contentAddModal = document.querySelector("#content-add-modal");
const contentAddButton = document.querySelector("#content-add-button");
const contentModalForm = document.querySelector("#content-modal-form");

const contentTitleInput = contentModalForm.querySelector(
  "#content-add-form-title"
);
const contentLinkInput = contentModalForm.querySelector(
  "#content-add-form-link"
);
/* ------------------------------ Image Modal Preview ----------------------------- */
const previewImageModal = document.querySelector("#preview-image-modal");
const cardImagePreview = previewImageModal.querySelector("#card-preview");
const modalPreviewCaption = previewImageModal.querySelector(
  "#modal-preview-caption"
);
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeOverlay);
  document.removeEventListener("keydown", handleEsc);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", handleEsc);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListElement.prepend(cardElement);
}

/*function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#card-image");
  const cardTitleElement = cardElement.querySelector("#card-title");

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewImageModal);
    modalPreviewCaption.textContent = data.name;
    cardImagePreview.src = data.link;
    cardImagePreview.alt = data.name;
  });

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  return cardElement;
}*/
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditBtn.addEventListener("click", () => {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
  editFormValidator.resetValidation();
});

contentAddButton.addEventListener("click", () => {
  openModal(contentAddModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

contentModalForm.addEventListener("submit", handleContentFormSubmit);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleEsc(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleImageClick(name, link) {
  modalPreviewCaption.textContent = name;
  cardImagePreview.src = link;
  cardImagePreview.alt = name;
  openModal(previewImageModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleContentFormSubmit(e) {
  e.preventDefault();
  const name = contentTitleInput.value;
  const link = contentLinkInput.value;
  renderCard({ name, link });
  closeModal(contentAddModal);
  e.target.reset();
  addFormValidator.disableButton();
}

initialCards.forEach((data) => {
  renderCard(data);
});

/* ------------------------------- validation ------------------------------- */
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileModalForm
);
const addFormValidator = new FormValidator(
  validationSettings,
  contentModalForm
);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
