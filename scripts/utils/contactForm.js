import { InputFactory } from "../factory/InputFactory.js";
import { UserData } from "../models/UserData.js";

const modalBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close-modal");

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

modalBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
    if(e.key === 'Escape') {
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
