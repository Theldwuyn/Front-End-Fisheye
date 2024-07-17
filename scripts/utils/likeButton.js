import { updateStickbar } from "./stickbar.js";

export function likeBtnHandler(arrayOfMedia, target) {

    const likeBtn = target.parentElement;
    //console.log(likeBtn);
    let mediaLikes = Number(likeBtn.textContent);
    let cardMedia = target.closest(".media-card").firstElementChild;
    //console.log(cardMedia);

    if (likeBtn.classList.contains("active-like")) {
        mediaLikes -= 1;
        likeBtn.classList.toggle("active-like");
    } else {
        mediaLikes += 1;
        likeBtn.classList.toggle("active-like");
    }

    updateLike();
    //console.log(arrayOfMedia);

    function updateLike() {
        likeBtn.innerHTML = `${mediaLikes} 
            <i class="fa-solid fa-heart red-font media-card__content--likeBtn"></i>`;
        
        const mediaObject = getMediaObject();
        mediaObject.likes = mediaLikes;

        let newTotalLike = 0;
        arrayOfMedia.forEach(media => {
            newTotalLike += media.likes;
        });

        updateStickbar(newTotalLike);
        
    }

    function getMediaObject() {
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
}

