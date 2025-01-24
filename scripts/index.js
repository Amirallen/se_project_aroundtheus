/* -------------------------------------------------------------------------- */
/*                               *   Dream On   *                               */
/* -------------------------------------------------------------------------- */

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

const modalNameInput = profileEditModal.querySelector("#modal-title");
const profileModalForm = profileEditModal.querySelector("#profile-modal-form");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modalDescriptionInput =
  profileEditModal.querySelector("#modal-description");
const cardListElement = document.querySelector("#cards-list");
const contentAddModal = document.querySelector("#content-add-modal");
const contentModalCloseBtn = contentAddModal.querySelector(
  "#content-modal-close-button"
);
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
const previewModalCloseButton = previewImageModal.querySelector(
  "#preview-close-button"
);
const cardImagePreview = previewImageModal.querySelector("#card-preview");
const modalPreviewCaption = previewImageModal.querySelector(
  "#modal-preview-caption"
);
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, list) {
  const cardElement = getCardElement(cardData);
  list.prepend(cardElement);
}

function getCardElement(cardData) {
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
    modalPreviewCaption.textContent = cardData.name;
    cardImagePreview.src = cardData.link;
    cardImagePreview.alt = cardData.name;
  });

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  return cardElement;
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditBtn.addEventListener("click", () => {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

contentAddButton.addEventListener("click", () => {
  openModal(contentAddModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

contentModalCloseBtn.addEventListener("click", () => {
  closeModal(contentAddModal);
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

contentModalForm.addEventListener("submit", handleContentFormSubmit);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

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
  renderCard({ name, link }, cardListElement);
  closeModal(contentAddModal);
  e.target.reset();
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
