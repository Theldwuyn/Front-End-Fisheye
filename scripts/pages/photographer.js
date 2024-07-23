import { getPhotographersInfosAndMedias } from "../API/api.js";
import { PhotographerTemplate } from "../templates/photographerTemplate.js";
import { MediaFactory } from "../factory/MediaFactory.js";
import { initLightbox } from "../utils/lightbox.js";
import { likeBtnHandler } from "../utils/likeButton.js";
import { initStickbar } from "../utils/stickbar.js";

/**
 * Retrieve the photograph ID within the page's URL
 * @returns {Number} urlId
 */
export function getUrlId() {
    const params = new URL(document.location).searchParams;
    const urlId = params.get('id');
    return parseInt(urlId);
}

/**
 * Add current photograph's name to the contact modal
 * @param {PhotographerTemplate} photograph 
 */
function addNameToModal(photograph) {
    const modalName = document.getElementById("name");
    //const nameText = photograph.name;
    const nameText = `
        <span class="sr-only">Contacter</span>${photograph.name}
        `;
    modalName.innerHTML = nameText;  
}

let arrayOfPhotographersObject = [];

/**
 * Create a photographer object for each photographer in the json file
 * Compare photographer's id with urlId to find the current photograph
 * Update the page's header with current photograph's informations
 * Call addNameToModal to update the contact modal
 * @param {Array} photographers from photographers.json
 * @param {Number} urlId 
 */
async function displayHeader(photographers, urlId) {
    photographers.forEach((photographer) => {
        const photograph = new PhotographerTemplate(photographer);
        arrayOfPhotographersObject.push(photograph);
        if(photograph.id === urlId) {
            photograph.createPhotographerHeader();
            addNameToModal(photograph);
        }
    });
}

let arrayOfMediaObject = [];
let arrayOfCardNode = [];

/**
 * /!\ This function is called by init() from photographer.js to initialize the app
 * /!\ And called again by updateMedia() from filter.js each time the user apply a filter
 * 
 * Filter the medias array to get only current photograph's media, call MediaFactory for each
 * medias to create the card (article) and the media object, then append the card
 * to the medias-wrapper container
 * @param {Array} medias from photographers.json
 * @param {Number} urlId 
 */
export async function displayMedias(medias, urlId) {

    /* Emptying both arrayOfMediaObject and arrayOfCardNode to avoid duplicate
    when updateMedia() call back this function */
    arrayOfMediaObject = [];
    arrayOfCardNode = [];

    const mediaSection = document.querySelector(".medias-wrapper");
    mediaSection.innerHTML = "";
    const currentPhotographMedias = medias.filter((media) => media.photographerId === urlId);

    currentPhotographMedias.forEach(media => {
        const { card } = new MediaFactory(media);
        const { mediaObject } = new MediaFactory(media);
        arrayOfCardNode.push(card);
        arrayOfMediaObject.push(mediaObject);
        mediaSection.appendChild(card);
    });

    initPageFeatures(arrayOfMediaObject, arrayOfCardNode, arrayOfPhotographersObject);
}

/**
 * Initialize page's features (lightbox, like buttons and stickbar)
 * @param {MediaFactory[]} arrayOfMediaObject 
 * @param {Node[]} arrayOfCardNode 
 * @param {PhotographerTemplate[]} arrayOfPhotographersObject 
 */
function initPageFeatures(arrayOfMediaObject, arrayOfCardNode, arrayOfPhotographersObject) {

    initLightbox(arrayOfMediaObject);

    arrayOfCardNode.forEach(card => {
        const likeBtn = card.querySelector(".media-card__content--likeBtn");
        //console.log(likeBtn);
        likeBtn.addEventListener("click", (e) => {
            if (e.target.nodeName === "SPAN") {
                likeBtnHandler(arrayOfMediaObject, e.target);
            }
        });
        likeBtn.addEventListener("keyup", (e) => {
            if (e.key === 'Enter' && e.target.nodeName === "SPAN") {
                likeBtnHandler(arrayOfMediaObject, e.target);
            }
        });
    });

    initStickbar(arrayOfMediaObject, arrayOfPhotographersObject);
}

/**
 * Initialize photographers and media arrays from json file
 * Launch the photograph page app
 */
async function init() {
    const { photographers } = await getPhotographersInfosAndMedias();
    const { media } = await getPhotographersInfosAndMedias();
    //console.log(media);
    const urlId = getUrlId();

    displayHeader(photographers, urlId);
    displayMedias(media, urlId);
}

init();


// Test, return focused element in the console
// window.addEventListener("keyup", (e) => {
//     if(e.key === 'Tab') {
//         const focus = document.activeElement;
//         console.log(focus);
//     }
// });
