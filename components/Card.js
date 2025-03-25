/* ---------------------------------- copy ---------------------------------- */
const profileEditModal = document.querySelector("#profile-edit-modal");
const contentAddModal = document.querySelector("#content-add-modal");
function openModal(modal) {
  if (modal === profileEditModal) {
    editFormValidator.resetValidation();
  } else if (modal === contentAddModal) {
    addFormValidator.resetValidation();
  }
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", handleEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeOverlay);
  document.removeEventListener("keydown", handleEsc);
  if (modal === contentAddModal) {
    contentModalForm.reset();
  }
}

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
/* ---------------------------------- copy ---------------------------------- */

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => this._handleLikeButton());

    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );

    this._cardImageElement = this._element.querySelector("#card-image");
    this._cardImageElement.addEventListener("click", () =>
      this._handleImagePreview()
    );

    this._cardTitleElement = this._element.querySelector("#card-title");
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handleImagePreview() {
    const previewImageModal = document.querySelector("#preview-image-modal");
    const cardImagePreview = previewImageModal.querySelector("#card-preview");
    const modalPreviewCaption = previewImageModal.querySelector(
      "#modal-preview-caption"
    );
    modalPreviewCaption.textContent = this._name;
    cardImagePreview.src = this._link;
    cardImagePreview.alt = this._name;
    openModal(previewImageModal);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;
    return this._element;
  }
}
