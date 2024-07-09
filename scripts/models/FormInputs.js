class Input {
    constructor(inputElement, errorMessage) {
        this.inputElement = inputElement;
        this.parentElement = inputElement.parentElement;
        this.errorMessage = errorMessage;
    }

    getValue() {
        return this.inputElement.value;
    }

    displayError() {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add("formData-modifier");
        errorSpan.innerText = this.errorMessage;
        if (this.parentElement.lastElementChild.nodeName !== "SPAN") {
            this.parentElement.appendChild(errorSpan);
        }
        if (!this.inputElement.classList.contains("blue-border")) {
            this.inputElement.classList.add("blue-border");
        }
    }

    hideError() {
        if (this.parentElement.lastElementChild.nodeName === "SPAN") {
            this.parentElement.lastElementChild.remove();
        }
        if (this.inputElement.classList.contains("blue-border")) {
            this.inputElement.classList.remove("blue-border");
        }
    }
}

export class InputTextEmail extends Input {
    constructor(inputElement, regExp, errorMessage) {
        super(inputElement, errorMessage);
        this.regExp = regExp;
    }

    validateInput() {
        const value = this.getValue();
        if(this.regExp.test(value)) {
            this.hideError();
            return true;
        } else {
            this.displayError();
            return false;
        }
    }
}

export class InputTextArea extends Input {
    constructor(inputElement, errorMessage) {
        super(inputElement, errorMessage)
    }

    validateInput() {
        const value = this.getValue();
        if(value.length !== 0) {
            this.hideError();
            return true;
        } else {
            this.displayError();
            return false;
        }
    }
}
