import { getPhotographers } from "../API/api.js";
import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { MediaFactory } from "../factory/MediaFactory.js";

function getUrlId() {
    const params = new URL(document.location).searchParams;
    const urlId = params.get('id');
    //console.log(urlId);
    return parseInt(urlId);
}

function addNameToModal(photograph) {
    const modalName = document.querySelector(".name");
    console.log(modalName);
    const nameText = photograph.name;
    modalName.innerText = nameText;  
}

async function displayHeader(medias, urlId) {
    medias.forEach((photographer) => {
        const photograph = new PhotographerTemplate(photographer);
        if(photograph.id === urlId) {
            photograph.createPhotographerHeader();
            addNameToModal(photograph);
        }
    });
}

async function displayMedias(medias, urlId) {

    const mediaSection = document.querySelector(".medias-wrapper");
    
    //console.log(medias);
    //let arrayOfMedia = [];
    medias.forEach(media => {
        if(media.photographerId === urlId) {
            const mediaCard = new MediaFactory(media);
            mediaSection.appendChild(mediaCard);
        }
    });
    
}


async function init() {
    const { photographers } = await getPhotographers();
    console.log(photographers);
    const { media } = await getPhotographers();
    console.log(media);
    const urlId = getUrlId();

    displayHeader(photographers, urlId);
    displayMedias(media, urlId);
}

init();