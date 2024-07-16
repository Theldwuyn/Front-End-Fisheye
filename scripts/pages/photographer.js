import { getPhotographers } from "../API/api.js";
import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { MediaFactory } from "../factory/MediaFactory.js";
import { initLightbox } from "../utils/lightbox.js";

export function getUrlId() {
    const params = new URL(document.location).searchParams;
    const urlId = params.get('id');
    //console.log(urlId);
    return parseInt(urlId);
}

function addNameToModal(photograph) {
    const modalName = document.getElementById("name");
    //console.log(modalName);
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

export async function displayMedias(medias, urlId) {

    const mediaSection = document.querySelector(".medias-wrapper");
    mediaSection.innerHTML = "";
    const currentPhotographMedias = medias.filter((media) => media.photographerId === urlId);
    //console.log(currentPhotographMedias);
    let arrayOfMedia = [];

    currentPhotographMedias.forEach(media => {
        const { card } = new MediaFactory(media);
        const { mediaObject } = new MediaFactory(media);
        arrayOfMedia.push(mediaObject);
        mediaSection.appendChild(card);
    });
    //console.log(arrayOfMedia);
    const allMediaNode = document.querySelectorAll(".media-card__media");
    //console.log(allMediaNode);
    initLightbox(allMediaNode, arrayOfMedia);
}


async function init() {
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    //console.log(media);
    const urlId = getUrlId();

    displayHeader(photographers, urlId);
    displayMedias(media, urlId);
}

init();
