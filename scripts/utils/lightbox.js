let currentIndex = 0;

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

const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");

export function initLightbox(allMediaNode, arrayOfMedia) {
    console.log(nextBtn);
    console.log(arrayOfMedia);
    console.log(allMediaNode);
    //const allMedia = document.querySelectorAll(".media-card__media");
    console.log("init");
    allMediaNode.forEach(media => {
        media.addEventListener("click", (e) => {
            e.preventDefault();
            openLightbox();
            //console.log(e.target);
            currentIndex = getIndex(arrayOfMedia, e.target);
            console.log(currentIndex);
            //console.log(currentIndex);
            updateLightbox(arrayOfMedia, currentIndex);
        });
    });

    nextBtn.addEventListener("click", () => nextMedia(arrayOfMedia));
    previousBtn.addEventListener("click", () => previousMedia(arrayOfMedia));
}


function openLightbox() {
    document.getElementById("lightbox").style.display = "block";
    console.log("open");
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    console.log("close");
}

const closeLightboxBtn = document.querySelector(".lightbox__content-close-btn");
closeLightboxBtn.addEventListener("click", () => {
    closeLightbox();
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
                        .find((elem) => elem.source === target.firstElementChild.getAttribute("src"))
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

