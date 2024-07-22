import { InputTextEmail, InputTextArea } from "../models/FormInputs.js";

// eslint-disable-next-line
const textReg = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\-]{2,}");
// eslint-disable-next-line
const emailReg = new RegExp("^[^\s@]+@[^\s@]+\.[^\s.]{2,}$");

export class InputFactory {
    constructor(input) {
        if (input.type === "text") {
            const inputText = new InputTextEmail(
                input, textReg, "Veuillez entrer 2 caractères alphabétique ou plus"
            );
            return inputText;

        } else if (input.type === "email") {
            const inputEmail = new InputTextEmail(
                input, emailReg, "Veuillez renseigner une adresse mail valide"
            );
            return inputEmail;
            
        } else {
            const inputArea = new InputTextArea(
                input, "Veuillez entrer votre message"
            );
            return inputArea;
        }
    }
}