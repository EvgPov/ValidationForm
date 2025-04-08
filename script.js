const showError = (formElement, inputElement, errorMessage)=> {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

const hideError = (formElement, inputElement, errorMessage)=> {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.remove("form__input-error_active");
}

const isValid = (formElement, inputElement) => {
 if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.messageError);
 } else {
  inputElement.setCustomValidity("");
 }
 if(!inputElement.validity.valid) {
  showError(formElement, inputElement, inputElement.validationMessage);
 } else {
  hideError(formElement, inputElement, inputElement.validationMessage);
  inputElement.classList.add("form__input_valid");
 }
}

const hasInvalidInput = (inputLst) => {
  return inputLst.some((inputItem) => !inputItem.validity.valid);
}
const toggleButtonsState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.diabled = true;
      buttonElement.classList.add("form__submit_disabled");
  } else {
      buttonElement.diabled = false;
      buttonElement.classList.remove("form__submit_disabled");
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");

  toggleButtonsState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonsState(inputList, buttonElement);      
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach(formItem => {
    setEventListeners(formItem);
  });
};

// const maskNumberCard = () => {
//   const numberCard = document.querySelector("#card-input");
//   const maskOption = {
//     mask: "0000 0000 0000 0000"
//   };
//   IMask(numberCard, maskOption);
// }

// maskNumberCard();
enableValidation();