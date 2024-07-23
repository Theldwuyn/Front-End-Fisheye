import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { getPhotographersInfosAndMedias } from "../API/api.js";


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerTemplate(photographer);
        //console.log(photographerModel);
        const photographCard = photographerModel.getPhotographCard();
        //console.log(userCardDOM);
        photographersSection.appendChild(photographCard);
    });
}

async function init() {
    // Get photographers data from json file
    const { photographers } = await getPhotographersInfosAndMedias();
    displayData(photographers);
}

init();
