import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { getPhotographers } from "../API/api.js";


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerTemplate(photographer);
        //console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        //console.log(userCardDOM);
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
