import { getPhotographers } from "../API/api.js";
import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { MediaFactory } from "../factory/MediaFactory.js";
import { initLightbox } from "../utils/lightbox.js";
import { likeBtnHandler } from "../utils/likeButton.js";
import { initStickbar } from "../utils/stickbar.js";

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

let photographersObject = [];

async function displayHeader(photographers, urlId) {
    photographers.forEach((photographer) => {
        const photograph = new PhotographerTemplate(photographer);
        photographersObject.push(photograph);
        if(photograph.id === urlId) {
            photograph.createPhotographerHeader();
            addNameToModal(photograph);
        }
    });
}

let arrayOfMedia = [];
let arrayOfCardNode = [];

export async function displayMedias(medias, urlId) {

    arrayOfMedia = [];
    arrayOfCardNode = [];

    const mediaSection = document.querySelector(".medias-wrapper");
    mediaSection.innerHTML = "";
    const currentPhotographMedias = medias.filter((media) => media.photographerId === urlId);
    //console.log(currentPhotographMedias);
    //let totalLikes = 0;

    currentPhotographMedias.forEach(media => {
        const { card } = new MediaFactory(media);
        const { mediaObject } = new MediaFactory(media);
        arrayOfCardNode.push(card);
        arrayOfMedia.push(mediaObject);
        mediaSection.appendChild(card);
    });
    //totalLikes = countLikes(arrayOfMedia);
    //console.log(totalLikes);
    //console.log(arrayOfMedia);
    const allMediaNode = document.querySelectorAll(".media-card__media");
    //console.log(allMediaNode);
    initLightbox(allMediaNode, arrayOfMedia);

    arrayOfCardNode.forEach(card => {
        const likeBtn = card.querySelector(".media-card__content--likeBtn");
        likeBtn.addEventListener("click", (e) => {
            if (e.target.nodeName === "I") {
                likeBtnHandler(arrayOfMedia, e.target);
            }
        });
    });
    initStickbar(arrayOfMedia, photographersObject);
}

// function countLikes(arrayOfMedia) {
//     let totalLikes = 0;
//     arrayOfMedia.forEach(media => {
//         totalLikes += media.likes;
//     });

//     return totalLikes;
// }


async function init() {
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    //console.log(media);
    const urlId = getUrlId();

    displayHeader(photographers, urlId);
    displayMedias(media, urlId);
}

init();


