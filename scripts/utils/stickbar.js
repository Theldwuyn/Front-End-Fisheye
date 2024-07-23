import { getUrlId } from "../pages/photographer.js";

/**
 * Initialize the stickbar with current photograph infos and their media's total
 * likes
 * /!\ This function is called by displayMedia() from photographer.js, it will
 * then be called each time the user apply a filter (see updateMedia() in filter.js)
 * @param {typeof Array<Videos|Photos>} arrayOfMedia 
 * @param {Object} photographersObject 
 */
export function initStickbar(arrayOfMedia, photographersObject) {

    const urlId = getUrlId();

    const stickbar = document.getElementById("stickbar");
    const stickbarContent = document.createElement("div");
    stickbarContent.classList.add("stickbar__content");

    const totalLikes = countLikes(arrayOfMedia);

    const currentPhotograph = photographersObject.find((photograph) => photograph.id === urlId);

    /* Avoid duplication of data inside stickbar when the function
    is called multiple times */
    if (!stickbar.hasChildNodes()) {
        stickbarContent.innerHTML = `
            <p class="total-like">${totalLikes} <span class="fa-solid fa-heart"></span></p>
            <p>${currentPhotograph.price}€ / jour</p>
            `;
        stickbar.appendChild(stickbarContent);
    }    
}

function countLikes(arrayOfMedia) {
    let totalLikes = 0;
    //console.log(arrayOfMedia);
    arrayOfMedia.forEach(media => {
        totalLikes += media.likes;
    });
    return totalLikes;
}

/**
 * Function called by likeBtnHandler() in likeButton.js
 * Update the stickbar with new total of likes when a like button is clicked
 * @param {Number} newTotalLike 
 */
export function updateStickbar(newTotalLike) {
    const stickbarTotalLike = document.querySelector(".total-like");
    stickbarTotalLike.innerHTML = `
        <p class="total-like">${newTotalLike} <span class="fa-solid fa-heart"></span></p>
        `;
}