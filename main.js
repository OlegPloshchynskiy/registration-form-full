const registration = document.forms.registration;
const inputs = document.querySelectorAll("input");
const user_id = registration.user_id;
const password = registration.password;
const name = registration.name;
const address = registration.address;
const country = registration.country;
const zip_code = registration.zip_code;
const email = registration.email;
const sex = registration.sex;
const language = registration.language;
const about = registration.about;
const labels = document.querySelectorAll(".form-label");
const rate = document.querySelectorAll(".rate");
const submit = document.querySelector("#submit");
const showPass = document.querySelector(".show-pass");
const alert = document.querySelector(".success");
submit.disabled = true;

const regex_password =
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{7,12}$/;
const regex_name = /^\w{1,64}\D\S$/;
const regex_address = /^\w+\,\s\w+\,\s\w{1,3}\.\w+\s\d+\/\d+$/i;
const regex_email = /^\S{1,64}@\w{2,6}\.\w{2,6}$/;

function error(n, mess) {
  labels[n].textContent = mess;
  labels[n].classList.add("text-danger");
  labels[n].classList.remove("text-primary");
  document.activeElement.classList.add("error");
}

function done(n, mess) {
  labels[n].textContent = mess + " *";
  labels[n].classList.remove("text-danger");
  labels[n].classList.add("text-primary");
  document.activeElement.classList.remove("error");
}

showPass.addEventListener("click", () => {
  if ((password.type = "password")) {
    password.type = "text";

    setTimeout(() => {
      password.type = "password";
    }, 1000);
  }
});

user_id.addEventListener("blur", () => {
  user_id.value.length > 3 && user_id.value.length <= 10
    ? done(0, "User ID")
    : error(0, "User ID - Invalid value");
});

password.addEventListener("blur", () => {
  regex_password.test(password.value)
    ? done(1, "Password")
    : error(
        1,
        "Password - Must use big and small letters, numbers and special symbols"
      );
});

name.addEventListener("blur", () => {
  regex_name.test(name.value)
    ? done(2, "Name")
    : error(2, "Name - invalid value. Letters only");
});

address.addEventListener("blur", () => {
  regex_address.test(address.value)
    ? done(3, "Address")
    : error(3, "Address - invalid address format. See example");
});

country.addEventListener("blur", () => {
  country.value === "sel"
    ? error(4, "Country - Choose one option")
    : done(4, "Country");
});

zip_code.addEventListener("blur", () => {
  zip_code.value.length !== 5
    ? error(5, "ZIP-code - invalid format")
    : done(5, "ZIP-code");
});

email.addEventListener("blur", () => {
  regex_email.test(email.value)
    ? done(6, "Email")
    : error(6, "Email - invalid email or empty");
});

for (let i = 0; i < sex.length; i++) {
  sex[i].addEventListener("blur", () => {
    sex[i].checked ? done(7, "Sex") : error(7, "Sex - Choose one option");
  });
}

let userLanguage;

for (let i = 0; i < language.length; i++) {
  language[i].addEventListener("blur", () => {
    if (language[0].checked && language[1].checked) {
      userLanguage = `${language[0].value}, ${language[1].value}`;
      return;
    }
    if (language[i].checked) {
      done(8, "Language");
      userLanguage = language[i].value;
    } else {
      error(8, "Language - Choose one option");
    }
  });
}

about.addEventListener("input", () => {
  if (about.value.length < 20) {
    error(9, `Comments - min length 20 charts ${about.value.length}/100`);
  } else {
    done(9, "Comments");
  }
});

function checkId() {
  if (user_id.value.length > 3 && user_id.value.length <= 10) {
    return true;
  } else {
    return false;
  }
}

function checkSex() {
  if (sex[0].checked || sex[1].checked) {
    console.log(true);
  } else {
    console.log(false);
  }
}

function checkInput() {
  if (
    regex_address.test(address.value) &&
    regex_email.test(email.value) &&
    regex_name.test(name.value && regex_password.test(password.value)) &&
    country.value !== "sel" &&
    checkId() &&
    zip_code.value.length === 5 &&
    about.value.length >= 20 &&
    (sex[0].checked || sex[1].checked) &&
    (language[0].checked || language[1].checked)
  ) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

registration.addEventListener("input", () => {
  checkInput();
});

function pushLocalStorage(e) {
  localStorage.setItem("User id", user_id.value);
  localStorage.setItem("User password", password.value);
  localStorage.setItem("User name", name.value);
  localStorage.setItem("User address", address.value);
  localStorage.setItem("User country", country.value);
  localStorage.setItem("User ZIP-code", zip_code.value);
  localStorage.setItem("User email", email.value);
  localStorage.setItem("User gender", sex.value);
  localStorage.setItem("User language", userLanguage);
  localStorage.setItem("User message", about.value);
}

function sendForm(e) {
  e.preventDefault();
  pushLocalStorage();
  alert.classList.add("slide-down");
  setTimeout(() => {
    alert.classList.add("slide-up");
  }, 2000);
  setTimeout(() => {
    alert.classList.remove("slide-down");
    alert.classList.remove("slide-up");
  }, 2300);
  window.location.reload();
}

registration.onsubmit = sendForm;
