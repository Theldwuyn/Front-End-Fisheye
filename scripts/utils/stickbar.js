import { getUrlId } from "../pages/photographer.js";

export function initStickbar(arrayOfMedia, photographersObject) {

    const urlId = getUrlId();

    const stickbar = document.getElementById("stickbar");
    const stickbarContent = document.createElement("div");
    stickbarContent.classList.add("stickbar__content");

    const totalLikes = countLikes(arrayOfMedia);
    

    const currentPhotograph = photographersObject.find((photograph) => photograph.id === urlId);

    if (!stickbar.hasChildNodes()) {
        stickbarContent.innerHTML = `
            <p class="total-like">${totalLikes} <i class="fa-solid fa-heart"></i></p>
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

export function updateStickbar(newTotalLike) {
    const stickbarTotalLike = document.querySelector(".total-like");
    stickbarTotalLike.innerHTML = `
        <p class="total-like">${newTotalLike} <i class="fa-solid fa-heart"></i></p>
        `;
}