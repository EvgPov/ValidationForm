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

const toggleButtonsState = (inputList, buttonElement, checkbox) => { 
  
      if (hasInvalidInput(inputList) || (!checkbox.checked)) {
          buttonElement.diabled = true;
          buttonElement.classList.add("form__submit_disabled");
      }   
      if (!hasInvalidInput(inputList) && (checkbox.checked)) {
          buttonElement.diabled = false;
          buttonElement.classList.remove("form__submit_disabled");
      }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__submit");
  const checkbox =  formElement.querySelector("#checkbox-input");
  const popup = document.querySelector(".popup");
 
  if (buttonElement !== null && checkbox !== null) {
    toggleButtonsState(inputList, buttonElement, checkbox);
  }  

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      if (buttonElement !== null && checkbox !== null) {
        toggleButtonsState(inputList, buttonElement, checkbox);  
      }      
    });
  });
  if (buttonElement !== null && checkbox !== null) {
    checkbox.addEventListener('change', () => {    
      toggleButtonsState(inputList, buttonElement,checkbox); 
    })
  }
  if (buttonElement !== null) {
    buttonElement.addEventListener('click', (event) => {
      const popup__input = document.querySelector(".popup__input");
      event.preventDefault();
      popup.classList.add("popup_opened");

      popup__input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') event.preventDefault(); 
      });

      popup__input.addEventListener('input', () => {  
        if (popup__input.value.length === 4 && popup__input.validity.valid) {
          formElement.submit();
        } 
      })
    })
  }  
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

// const maskNumberPhone = () => {
//   const numberPhone = document.querySelector("#phone-input");
//   const maskOption = {
//     mask: "+7(000)000-00-00"
//   };
//   IMask(numberPhone, maskOption);
// }

// maskNumberPhone();

enableValidation();