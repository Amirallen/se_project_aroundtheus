export default class FormValidator {
  constructor(settings, formEl) {
    this._form = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._errorClass = settings._errorClass;
  }

  _showInputError(inputEl) {
    const errorSpan = this._form.querySelector("#" + inputEl.id + "-error");
    errorSpan.textContent = inputEl.validationMessage;
    inputEl.classList.add(this._inputErrorClass);
  }
  _hideInputError(inputEl) {
    errorSpan.textContent = "";
    inputEl.classList.remove(this._errorClass);
  }
  checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl, this._form, settings);
    } else {
      this._showInputError(inputEl, this._form, settings);
    }
  }
  _hasValidInputs() {
    this._inputList.every((inputEl) => inputEl.validity.valid === true);
  }
  _disableButton() {
    if (!hasValidInputs(this._inputList)) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    }
  }
  _enableButton() {
    if (this._hasValidInputs(this._inputList)) {
      this._submitButtonSelector.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    }
  }
  _toggleButtonState() {
    if (!this._hasValidInputs(this._inputList)) {
      disableButton(this._inputList, this._submitButtonSelector, settings);
    }
    enableButton(this._inputList, this._submitButtonSelector, settings);
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity(settings, inputEl, this._form);
        toggleButtonState(
          this._inputList,
          this._submitButtonSelector,
          settings
        );
      });
    });
  }
  enableValidation(settings) {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  }
}
