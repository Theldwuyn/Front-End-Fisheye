let currentIndex = 0;
let isTherePreviousAndNextEventListener = false;

const lightbox = document.getElementById("lightbox");
const mainSection = document.getElementById("main");
const headerSection = document.getElementById("header");

/**
 * Initialize the lightbox with the current displayed media (filtered or not)
 * Declaration of nextMedia() and previousMedia() because each function need
 * arrayOfMedia
 * arrayOfMedia come from photographer.js -> displayMedias();
 * @param {array[object]} arrayOfMedia 
 */
export function initLightbox(arrayOfMedia) {

    const allMediaNode = document.querySelectorAll(".media-card__media");

    function nextMedia(arrayOfMedia) {
        if (currentIndex < arrayOfMedia.length -1) {
            currentIndex += 1;
        } else {
            currentIndex = 0;
        }
        console.log(currentIndex);
        updateLightbox(arrayOfMedia, currentIndex);
    }
    
    function previousMedia(arrayOfMedia) {
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = arrayOfMedia.length -1;
        }
        console.log(currentIndex);
        updateLightbox(arrayOfMedia, currentIndex);
    }
    
    function handleNextBtnClick() {
        nextMedia();
    }
    
    function handlePreviousBtnClick() {
        previousMedia();
    }

    const nextBtn = document.getElementById("nextBtn");
    const previousBtn = document.getElementById("previousBtn");
   

    allMediaNode.forEach(media => {
        media.addEventListener("click", (e) => {
            e.preventDefault();
            openLightbox();
            currentIndex = getIndex(arrayOfMedia, e.target);
            console.log(currentIndex);
            updateLightbox(arrayOfMedia, currentIndex);
        });
    });

    allMediaNode.forEach(media => {
        media.addEventListener("keyup", (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                openLightbox();
                currentIndex = getIndex(arrayOfMedia, e.target);
                updateLightbox(arrayOfMedia, currentIndex);
            }
        });
    });

    /* Ensure the eventListener on nextBtn and previousBtn are not duplicated
    when the function is called multiple times 
    isTherePreviousAndNextEventListener become true after the first call
    of initLightBox() */
    if(!isTherePreviousAndNextEventListener) {
        nextBtn.addEventListener("click", handleNextBtnClick);
        nextBtn.addEventListener("keyup", (e) => {
            if(e.key === 'Enter') {
                handleNextBtnClick();
            }
        });
        window.addEventListener("keyup", (e) => {
            if(e.key === 'ArrowRight' && lightbox.style.display === "block") {
                handleNextBtnClick();
            }
        });

        previousBtn.addEventListener("click", handlePreviousBtnClick);
        previousBtn.addEventListener("keyup", (e) => {
            if(e.key === 'Enter') {
                handlePreviousBtnClick();
            }
        });
        window.addEventListener("keyup", (e) => {
            if(e.key === 'ArrowLeft' && lightbox.style.display === "block") {
                handlePreviousBtnClick();
            }
        })
    }
    
    isTherePreviousAndNextEventListener = true;
}

function openLightbox() {
    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", "false");

    mainSection.setAttribute("inert", "true");
    mainSection.setAttribute("aria-hidden", "true");

    headerSection.setAttribute("inert", "true");
    headerSection.setAttribute("aria-hidden", "true");

    //console.log("open");
}

function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");

    mainSection.removeAttribute("inert");
    mainSection.setAttribute("aria-hidden", "false");

    headerSection.removeAttribute("inert");
    headerSection.setAttribute("aria-hidden", "false");

    //console.log("close");
}

const closeLightboxBtn = document.querySelector(".lightbox__content-close-btn");

closeLightboxBtn.addEventListener("click", () => {
    closeLightbox();
});

closeLightboxBtn.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
        closeLightbox();
    }
});

window.addEventListener("keyup", (e) => {
    if(e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

/**
 * Get the index of the targeted media inside arrayOfMedia at the opening of the lightbox
 * @param {Array[Object]} arrayOfMedia 
 * @param {Node} target 
 * @returns {Number} index
 */
function getIndex(arrayOfMedia, target) {
    let index;
    switch(target.nodeName) {
        case "IMG":
            index = arrayOfMedia.indexOf(arrayOfMedia
                        .find((elem) => elem.source === target.getAttribute("src"))
                    );
            return index;
        
        case "VIDEO":
            index = arrayOfMedia.indexOf(arrayOfMedia
                        .find((elem) => elem.source === target.firstElementChild
                                                        .getAttribute("src"))
                    );
            return index;
        
        default:
            throw new Error("can't find element's index");
    }
}

/**
 * Change the media displayed in the lightbox based on its index inside arrayOfMedia
 * @param {Array[Object]} arrayOfMedia 
 * @param {Number} index 
 */
function updateLightbox(arrayOfMedia, index) {
    const mediaWrapper = document.querySelector(".lightbox__content-media");
    const mediaLightbox = arrayOfMedia[index].image ? 
        arrayOfMedia[index].getPhotoLightbox() : arrayOfMedia[index].getVideoLightbox();
    
    mediaWrapper.innerHTML = mediaLightbox;
}
