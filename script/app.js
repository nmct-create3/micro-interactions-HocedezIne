let email = {},
    password = {},
    signInButton;

const getDOMlements = () => {
    email.input = document.querySelector(".js-email-input");
    email.message = document.querySelector(".js-email-error-message");
    email.field = document.querySelector(".js-email-field");
    password.input = document.querySelector(".js-password-input");
    password.message = document.querySelector(".js-password-error-message");
    password.field = document.querySelector(".js-password-field");
    signInButton = document.querySelector(".js-sign-in-button");
    enableListeners();
};

const doubleCheckEmail = () => {
    if (!isEmpty(email.input.value) && !isValid(email)) {
        addErrors(email, "Invalid email");
    } else {
        removeErrors(email);
    }
};
const doubleCheckPassword = () => {
    if (!isEmpty(password.input.value) && !isValid(password)) {
        addErrors(password, "Invalid password");
    } else {
        removeErrors(password);
    }
};

const enableListeners = () => {
    email.input.addEventListener("blur", () => {
        if (!isValid(email)) {
            email.input.addEventListener("input", doubleCheckEmail);
            isEmpty(email.input.value) == false ?
                addErrors(email, "Invalid email") :
                addErrors(email, "This field is required");
        } else {
            email.input.removeEventListener("input", doubleCheckEmail);
        }
    });
    password.input.addEventListener("blur", () => {
        if (!isValid(password)) {
            password.input.addEventListener("input", doubleCheckPassword);
            isEmpty(password.input.value) == false ?
                addErrors(password, "Invalid password") :
                addErrors(password, "This field is required");
        } else {
            password.input.removeEventListener("input", doubleCheckPassword);
        }
    });
    signInButton.addEventListener("click", (event) => {
        event.preventDefault();
        if ((isValid(email) && !isEmpty(email.input.value)) && (isValid(password) && !isEmpty(password.input.value))) {
            console.log(email.input.value);
            console.log(password.input.value);
        }
    });
};

const addErrors = (obj, message) => {
    obj.message.innerHTML = message;
    obj.field.classList.add("has-error");
};
const removeErrors = (obj) => {
    obj.message.innerHTML = "";
    obj.field.classList.remove("has-error");
};

const isValid = (obj) => {
    if (obj === email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.input.value);
    } else if (obj === password) {
        return obj.input.value.length > 1;
    } else {
        return false;
    }
};

const isEmpty = function(fieldValue) {
    return !fieldValue || !fieldValue.length;
};

const handleFloatingLabel = () => {
  let emailLabel = document.querySelector(".js-email-label"),
      passwordLabel = document.querySelector(".js-password-label");
  
  email.input.addEventListener("blur", function(){
    if(!isEmpty(email.input.value)){
      emailLabel.classList.add("is-floating");
    }else {
      emailLabel.classList.remove("is-floating");
    }
  })

  password.input.addEventListener("blur", function(){
    if(!isEmpty(password.input.value)){
      passwordLabel.classList.add("is-floating");
    }else {
      passwordLabel.classList.remove("is-floating");
    }
  })
};

const handlePasswordSwitcher = () => {
    const passwordInput = document.querySelector(".js-password-input"),
        passwordToggle = document.querySelector(".js-password-toggle");

    if (!passwordInput || !passwordToggle) {
        console.error("classes not found");
        return;
    }

    passwordToggle.addEventListener("change", () => {
        passwordInput.type = passwordInput.type == "password" ? "text" : "password";
    });
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded!");
    handlePasswordSwitcher();
    getDOMlements();
    handleFloatingLabel();
});