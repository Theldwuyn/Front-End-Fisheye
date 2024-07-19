let currentIndex = 0;
let boolTest = false;

export function initLightbox(arrayOfMedia) {

    const allMediaNode = document.querySelectorAll(".media-card__media");

    function nextMedia() {
        if (currentIndex < arrayOfMedia.length -1) {
            currentIndex += 1;
        } else {
            currentIndex = 0;
        }
        console.log(currentIndex);
        updateLightbox(arrayOfMedia, currentIndex);
    }
    
    function previousMedia() {
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

    
    if(!boolTest) {
        nextBtn.addEventListener("click", handleNextBtnClick);
        nextBtn.addEventListener("keyup", (e) => {
            if(e.key === 'Enter') {
                handleNextBtnClick();
            }
        });
        previousBtn.addEventListener("click", handlePreviousBtnClick);
        previousBtn.addEventListener("keyup", (e) => {
            if(e.key === 'Enter') {
                handlePreviousBtnClick();
            }
        });
    }
    
    boolTest = true;
}

const lightbox = document.getElementById("lightbox");
const mainSection = document.getElementById("main");
const headerSection = document.getElementById("header");

function openLightbox() {
    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", "false");

    mainSection.setAttribute("inert", "true");
    mainSection.setAttribute("aria-hidden", "true");

    headerSection.setAttribute("inert", "true");
    headerSection.setAttribute("aria-hidden", "true");

    console.log("open");
}

function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");

    mainSection.removeAttribute("inert");
    mainSection.setAttribute("aria-hidden", "false");

    headerSection.removeAttribute("inert");
    headerSection.setAttribute("aria-hidden", "false");

    console.log("close");
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

function updateLightbox(arrayOfMedia, index) {
    const mediaWrapper = document.querySelector(".lightbox__content-media");
    const mediaLightbox = arrayOfMedia[index].image ? 
        arrayOfMedia[index].getPhotoLightbox() : arrayOfMedia[index].getVideoLightbox();
    
    mediaWrapper.innerHTML = mediaLightbox;
}

