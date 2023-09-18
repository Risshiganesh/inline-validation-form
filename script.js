const form = document.querySelector("form");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email + span.error");

const country = document.querySelector("#country");
const countryError = document.querySelector("#country + span.error");

const zipcode = document.querySelector("#zipcode");
const zipcodeError = document.querySelector("#zipcode + span.error");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password + span.error");

const passConf = document.querySelector("#pass-conf");
const passwordConfError = document.querySelector("#pass-conf + span.error");

const submitStatus = document.querySelector(".submission-status");

email.addEventListener("input", function () {
  validateEmail();
});

country.addEventListener("input", function () {
  validateCountry();
});

zipcode.addEventListener("input", function () {
  validateZipcode();
});

password.addEventListener("input", function () {
  validatePassword();
});

passConf.addEventListener("input", function () {
  validatePassword();
});

form.addEventListener("submit", function (e) {
  // if email input is not valid, prevent the form from submitting
  showError(e);
});

function showError(event) {
  // email validation
  let emailStatus = validateEmail(event);
  // country validation
  let countryStatus = validateCountry(event);
  // zip code
  let zipcodeStatus = validateZipcode(event);
  // password
  let passwordStatus = validatePassword(event);

  if (!emailStatus || !countryStatus || !zipcodeStatus || !passwordStatus) {
    submitStatus.textContent = "Submission incomplete, try again";
  }

  if (emailStatus && countryStatus && zipcodeStatus && passwordStatus) {
    submitStatus.textContent = "Submission successful, High 5!";
    // remove this preventDefault in real life use cases (when you actually want the form to submit).
    event.preventDefault();
  }
}

function validateEmail(event) {
  if (email.validity.valid) {
    email.className = "input-valid";
    emailError.textContent = "";
    emailError.className = "error";
    return true;
  }

  if (!email.validity.valid) {
    email.className = "input-invalid";
    emailError.textContent = "Input a valid email address";
    emailError.className = "error active";
    // email.focus();
    if (event) {
      event.preventDefault();
    }
  }

  if (email.validity.valueMissing) {
    email.className = "input-invalid";
    emailError.textContent = "You need to enter an email address";
    emailError.className = "error active";
  }

  if (email.validity.typeMismatch) {
    email.className = "input-invalid";
    emailError.textContent = "A valid email will have an @ symbol";
    emailError.className = "error active";
  }

  if (email.validity.tooShort) {
    email.className = "input-invalid";
    emailError.textContent = `Email should at least be ${email.minLength} characters, it is currently ${email.value.length}.`;
    emailError.className = "error active";
  }
}

function validateCountry(event) {
  if (country.validity.valid) {
    country.className = "input-valid";
    countryError.textContent = "";
    countryError.className = "error";
    return true;
  }

  if (!country.validity.valid) {
    country.className = "input-invalid";
    countryError.textContent = "Choose a country";
    countryError.className = "error active";
    if (event) {
      event.preventDefault();
    }
  }
}

function validateZipcode(event) {
  let mypattern = /^\d{5}$/;
  let uspattern = /^\d{5}(-\d{4})?$/;
  let ukpattern = /^[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}$/;

  const patternArray = [
    {
      code: "my",
      pattern: /^\d{5}$/,
      message: "Key in the a Malaysian zipcode",
    },
    {
      code: "us",
      pattern: /^\d{5}(-\d{4})?$/,
      message: "Key in the an American zipcode",
    },
    {
      code: "uk",
      pattern: /^[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}$/,
      message: "Key in the a British zipcode",
    },
  ];

  if (!country.value) {
    zipcode.className = "input-invalid";
    zipcodeError.textContent = "Please choose a Country first";
    zipcodeError.className = "error active";

    if (event) {
      event.preventDefault();
    }
    return;
  }

  let chosenPattern;

  patternArray.forEach((patternObj) => {
    if (patternObj.code === country.value) {
      chosenPattern = patternObj;
    }
  });

  // country.value

  if (!zipcode.value) {
    zipcode.className = "input-invalid";
    zipcodeError.textContent = "Please fill the zipcode";
    zipcodeError.className = "error active";

    if (event) {
      event.preventDefault();
    }
    return;
  }

  if (chosenPattern.pattern.test(zipcode.value)) {
    zipcode.className = "input-valid";
    zipcodeError.textContent = "";
    zipcodeError.className = "error";
    return true;
  }

  if (!chosenPattern.pattern.test(zipcode.value)) {
    zipcode.className = "input-invalid";
    zipcodeError.textContent = chosenPattern.message;
    zipcodeError.className = "error active";

    if (event) {
      event.preventDefault();
    }
  }
}

function validatePassword(event) {
  if (password.validity.valid) {
    passwordError.textContent = "";
    passwordError.className = "error";
    passwordConfError.textContent = "Now type a matching password";
    passwordConfError.className = "error active";
  }

  if (password.value === passConf.value && password.validity.valid) {
    password.className = "input-valid";
    passConf.className = "input-valid";
    passwordConfError.textContent = "";
    passwordConfError.className = "error";
    return true;
  }

  if (password.validity.valueMissing) {
    passwordError.textContent = "You need to enter a password";
    passwordError.className = "error active";
    if (event) {
      event.preventDefault();
    }
  }

  if (password.validity.tooShort) {
    passwordError.textContent = `Password should at least be ${password.minLength} characters, it is currently ${password.value.length}.`;
    passwordError.className = "error active";
    if (event) {
      event.preventDefault();
    }
  }

  if (password.value !== passConf.value) {
    password.className = "input-invalid";
    passConf.className = "input-invalid";
    if (!passConf.value) {
      if (event) {
        passwordConfError.textContent =
          "Please fill this with a matching password";
        passwordConfError.className = "error active";
        event.preventDefault();
      }

      return;
    }
    // password.validity;
    passwordConfError.textContent = "Passwords do not match";
    passwordConfError.className = "error active";
    if (event) {
      event.preventDefault();
    }
  }
}
