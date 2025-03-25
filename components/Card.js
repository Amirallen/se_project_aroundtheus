export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
      this._handleImageClick(this._name, this._link)
    );

    this._cardTitleElement = this._element.querySelector("#card-title");
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
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
