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
const modalCloseBtn = document.querySelector("#modal-close-button");
const ModalNameInput = profileEditModal.querySelector("#modal-title");
const editModalForm = profileEditModal.querySelector("#modal-form");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const ModalDescriptionInput =
  profileEditModal.querySelector("#modal-description");
const cardListElement = document.querySelector("#cards-list");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeEditModal() {
  profileEditModal.classList.remove("modal_opened");
}

function openEditModal() {
  profileEditModal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#card-image");
  const cardTitleElement = cardElement.querySelector("#card-title");

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  return cardElement;
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditBtn.addEventListener("click", () => {
  ModalNameInput.value = profileName.textContent;
  ModalDescriptionInput.value = profileDescription.textContent.trim();
  openEditModal();
});

modalCloseBtn.addEventListener("click", closeEditModal);

editModalForm.addEventListener("submit", handleProfileFormSubmit);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = ModalNameInput.value;
  profileDescription.textContent = ModalDescriptionInput.value;
  closeEditModal();
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});
