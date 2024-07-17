let currentIndex = 0;

export function initLightbox(allMediaNode, arrayOfMedia) {

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

    const newNextBtn = nextBtn.cloneNode(true);
    const newPreviousBtn = previousBtn.cloneNode(true);

    nextBtn.replaceWith(newNextBtn);
    previousBtn.replaceWith(newPreviousBtn);
    

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

    newNextBtn.addEventListener("click", handleNextBtnClick);
    newPreviousBtn.addEventListener("click", handlePreviousBtnClick);
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

