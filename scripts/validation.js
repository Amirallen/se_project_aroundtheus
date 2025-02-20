const showInputError = (inputEl, formEl, settings) => {
  const errorSpan = formEl.querySelector("#" + inputEl.id + "-error");
  errorSpan.textContent = inputEl.validationMessage;
  inputEl.classList.add(settings.errorClass);
};

const hideInputError = (inputEl, formEl, settings) => {
  const errorSpan = formEl.querySelector("#" + inputEl.id + "-error");
  errorSpan.textContent = "";
  inputEl.classList.remove(settings.errorClass);
};

const checkInputValidity = (settings, inputEl, formEl) => {
  if (inputEl.validity.valid) {
    hideInputError(inputEl, formEl, settings);
  } else {
    showInputError(inputEl, formEl, settings);
  }
};

const hasValidInputs = (inputList) =>
  inputList.every((inputEl) => inputEl.validity.valid === true);

function disableButton(inputList, submitButton, settings) {
  if (!hasValidInputs(inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass);
    submitButton.disabled = true;
  }
}

function enableButton(inputList, submitButton, settings) {
  if (hasValidInputs(inputList)) {
    submitButton.classList.remove(settings.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

const toggleButtonState = (inputList, submitButton, settings) => {
  if (!hasValidInputs(inputList)) {
    disableButton(inputList, submitButton, settings);
    return;
  }
  enableButton(inputList, submitButton, settings);
};

const setEventListeners = (formEl, settings) => {
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(settings, inputEl, formEl);
      toggleButtonState(inputList, submitButton, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formElements = [...document.querySelectorAll(settings.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  });
};

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
