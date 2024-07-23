import { updateStickbar } from "./stickbar.js";

/**
 * Change a media's like amount when the like button is clicked and update
 * the stickbar
 * @param {typeof Array<Videos|Photos>} arrayOfMedia 
 * @param {Node} target 
 */
export function likeBtnHandler(arrayOfMedia, target) {

    let cardMedia = target.closest(".media-card").firstElementChild;
    console.log(target);

    const likeBtn = target.parentElement;
    console.log(likeBtn.classList.contains("active-like"));
    let mediaLikes = Number(likeBtn.textContent);
    
    if (likeBtn.classList.contains("active-like")) {
        mediaLikes -= 1;
        likeBtn.classList.toggle("active-like");
    } else {
        mediaLikes += 1;
        likeBtn.classList.toggle("active-like");
    }

    likeBtn.innerHTML = `${mediaLikes} 
    <span class="fa-solid fa-heart red-font" role="img" aria-label="bouton like" tabindex="0"></span>`;

    updateJsonLike(mediaLikes, arrayOfMedia, cardMedia);
    const newTotalLike = updateTotalLike(arrayOfMedia);
    updateStickbar(newTotalLike);

}

/**
 * Update a media object's like amount
 * @param {Number} mediaLikes 
 * @param {typeof Array<Videos|Photos>} arrayOfMedia 
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
 * @param {typeof Array<Videos|Photos>} arrayOfMedia 
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
 * @param {typeof Array<Videos|Photos>} arrayOfMedia 
 * @returns {Number} newTotalLike
 */
function updateTotalLike(arrayOfMedia) {
    let newTotalLike = 0;
    arrayOfMedia.forEach(media => {
        newTotalLike += media.likes;
    });

    return newTotalLike; 
}
