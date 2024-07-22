import { updateStickbar } from "./stickbar.js";

/**
 * Change a media's like amount when the like button is clicked
 * @param {Array[Object]} arrayOfMedia 
 * @param {Node} target 
 */
export function likeBtnHandler(arrayOfMedia, target) {

    let cardMedia = target.closest(".media-card").firstElementChild;

    const likeBtn = target.parentElement;
    let mediaLikes = Number(likeBtn.textContent);
    
    if (likeBtn.classList.contains("active-like")) {
        mediaLikes -= 1;
        likeBtn.classList.toggle("active-like");
    } else {
        mediaLikes += 1;
        likeBtn.classList.toggle("active-like");
    }

    likeBtn.innerHTML = `${mediaLikes} 
    <span class="fa-solid fa-heart red-font media-card__content--likeBtn" role="img" aria-label="likes" tabindex="0"></span>`;

    updateJsonLike(mediaLikes, arrayOfMedia, cardMedia);
    const newTotalLike = updateTotalLike(arrayOfMedia);
    updateStickbar(newTotalLike);

}

/**
 * Update a media's like amount in the json file
 * @param {Number} mediaLikes 
 * @param {Array[Object]} arrayOfMedia 
 * @param {Node} cardMedia 
 */
function updateJsonLike(mediaLikes, arrayOfMedia, cardMedia) {

    const mediaObject = getMediaObject(cardMedia, arrayOfMedia);
    mediaObject.likes = mediaLikes;
}

/**
 * Return the object "media" (video or photo) in arrayOfMedia matching the like button's
 * media targeted
 * @param {Node} cardMedia 
 * @param {Array[Object]} arrayOfMedia 
 * @returns 
 */
function getMediaObject(cardMedia, arrayOfMedia) {
    let mediaObject;
    switch(cardMedia.nodeName) {
        case "IMG":
            mediaObject = arrayOfMedia
                .find((media) => media.source === cardMedia.getAttribute("src"));
            return mediaObject;
        
        case "VIDEO":
            mediaObject = arrayOfMedia
                .find((media) => media.source === cardMedia.firstElementChild
                                                    .getAttribute("src"));
            return mediaObject;
        
        default:
            throw new Error("can't find the media object");
    }
}

/**
 * Calculate the new total of like of every media
 * @param {Array[Object]} arrayOfMedia 
 * @returns {Number} newTotalLike
 */
function updateTotalLike(arrayOfMedia) {
    let newTotalLike = 0;
    arrayOfMedia.forEach(media => {
        newTotalLike += media.likes;
    });

    return newTotalLike; 
}
