import { InputFactory } from "../factory/InputFactory.js";
import { UserData } from "../models/UserData.js";

const modalBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close-modal");
const modal = document.getElementById("contact_modal");
const mainSection = document.getElementById("main");
const headerSection = document.getElementById("header");

function openModal() {
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    // The following code disabled the page content when the modal is open
    // to allow the user to navigate through the modal with the tab key
    mainSection.setAttribute("inert", "true");
    mainSection.setAttribute("aria-hidden", "true");

    headerSection.setAttribute("inert", "true");
    headerSection.setAttribute("aria-hidden", "true");
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    // The following code re-enable the page content when the modal is close
    mainSection.removeAttribute("inert");
    mainSection.setAttribute("aria-hidden", "false");

    headerSection.removeAttribute("inert");
    headerSection.setAttribute("aria-hidden", "false");
}

modalBtn.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);
closeBtn.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
        closeModal();
    }
});

window.addEventListener("keyup", (e) => {
    if(e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});


function main() {
    let boolFromValidation = [];
    let inputValues = [];

    const inputs = document.querySelectorAll("input[type=text], input[type=email], textarea");

    inputs.forEach(input => {
        const inputObject = new InputFactory(input);
        boolFromValidation.push(inputObject.validateInput());
        inputValues.push(inputObject.getValue());
    });

    if (isAllTrue(boolFromValidation)) {
        const userData = new UserData(inputValues);
        console.log(userData);
        closeModal();
        clearForm(inputs);
    }
}

function isAllTrue(array) {
	if (array.every((elem) => elem === true)) {
		return true;
	} else {
		return false;
	}
}

function clearForm(inputs) {
    inputs.forEach(input => {
        input.value = "";
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    main();
});
