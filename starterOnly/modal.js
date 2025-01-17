function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelector(".close");
const modalForm = document.getElementById("modalForm");
const successMessage = document.getElementById("successMessage");

//Form Elements
const formInputs = {
  firstname: {
    input: modalForm.elements["first"],
    errMsg: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
    get smallElt() {
      return this.input.parentNode.querySelector("small");
    },
  },
  lastName: {
    input: modalForm.elements["last"],
    errMsg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    get smallElt() {
      return this.input.parentNode.querySelector("small");
    },
  },
  email: {
    input: modalForm.elements["email"],
    errMsg: "Veuillez enter un email valide.",
    get smallElt() {
      return this.input.parentNode.querySelector("small");
    },
  },
  birthdate: {
    input: modalForm.elements["birthdate"],
    errMsg: "Vous devez entrer votre date de naissance.",
    get smallElt() {
      return this.input.parentNode.querySelector("small");
    },
  },
  contest: {
    input: modalForm.elements["quantity"],
    errMsg: "Vous devez indiquer un nombre entre 0 et 99.",
    get smallElt() {
      return this.input.parentNode.querySelector("small");
    },
  },
  consent: {
    input: modalForm.elements["checkbox1"],
    errMsg: "Vous devez vérifier que vous acceptez les termes et conditions.",
    get smallElt() {
      return this.input.parentNode.querySelector("small");
    },
  },
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeButton.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Clean the value of the inputs
function cleanModalForm() {
  formInputs.firstname.input.value = "";
  formInputs.lastName.input.value = "";
  formInputs.email.input.value = "";
  formInputs.birthdate.input.value = "";
  formInputs.contest.input.value = "";
  formInputs.consent.input.checked = false;
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
  //check if the modal is the correct content
  if (successMessage.className) {
    modalForm.className = "";
    successMessage.className = "";
    cleanModalForm();
  }
}

//add error message
function errMessage(element, type) {
  if (!type) {
    element.smallElt.textContent = element.errMsg;
    element.input.classList.add("input--error");
    return type;
  } else {
    element.smallElt.textContent = "";
    element.input.classList.remove("input--error");
    return type;
  }
}

//check if a name input is valid
function hasValue(element) {
  // regex to check if the input is only alphabetic

  //il n'y a pas de message d'erreur
  if (element.input.value.trim().length < 2) {
    return errMessage(element, false);
  } else {
    return errMessage(element, true);
  }
}

//Check if the email is valid
function isValidEmail(element) {
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(element.input.value.trim())) {
    return errMessage(element, false);
  } else {
    return errMessage(element, true);
  }
}

//Check if the birthdate is valid
function isValidBirthdate(element) {
  return element.input.value
    ? errMessage(element, true)
    : errMessage(element, false);
}

//Check if the contest is valid
function isValidContest(element) {
  let contestRegex = /^\d{1,2}$/;
  return contestRegex.test(element.input.value.trim())
    ? errMessage(element, true)
    : errMessage(element, false);
}

//Check if the consent is true
function isValidConsent(element) {
  if (element.input.checked) {
    element.input.parentElement
      .querySelector(".checkbox-icon")
      .classList.remove("input--error");
    return errMessage(element, true);
  } else {
    element.input.parentElement
      .querySelector(".checkbox-icon")
      .classList.add("input--error");
    return errMessage(element, false);
  }
}

// Form submit listener
modalForm.addEventListener("submit", (e) => {
  //Prevent form submission default behaviour
  e.preventDefault();

  //check every required inputs
  let firstName = hasValue(formInputs.firstname);
  let lastName = hasValue(formInputs.lastName);
  let email = isValidEmail(formInputs.email);
  let birthdate = isValidBirthdate(formInputs.birthdate);
  let contest = isValidContest(formInputs.contest);
  let consent = isValidConsent(formInputs.consent);

  if (firstName && lastName && email && birthdate && contest && consent) {
    modalForm.className = "sliding-out";
    successMessage.className = "sliding-in";
  }
});
