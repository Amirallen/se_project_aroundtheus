export default class FormValidator {
  constructor(settings, formEl) {
    this._form = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(inputEl) {
    const errorSpan = this._form.querySelector("#" + inputEl.id + "-error");
    errorSpan.textContent = inputEl.validationMessage;
    inputEl.classList.add(this._inputErrorClass);
  }
  _hideInputError(inputEl) {
    const errorSpan = this._form.querySelector("#" + inputEl.id + "-error");
    errorSpan.textContent = "";
    inputEl.classList.remove(this._inputErrorClass);
  }
  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
  }
  _hasValidInputs(inputList) {
    return inputList.every((inputEl) => inputEl.validity.valid === true);
  }
  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  _toggleButtonState() {
    if (this._hasValidInputs(this._inputList)) {
      this._enableButton();
    } else {
      this.disableButton();
    }
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
    this._toggleButtonState();
  }
}
