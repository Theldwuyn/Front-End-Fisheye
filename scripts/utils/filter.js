import { getPhotographersInfosAndMedias } from "../API/api.js";
import { displayMedias, getUrlId } from "../pages/photographer.js";


const dropdownBtn = document.getElementById("listbox-dropdown");
const optionsList = document.querySelector(".dropdown-menu__list");
const optionsItems = document.querySelectorAll(".dropdown-menu__list-item");
const icon = document.querySelector(".select-container__icon-wrapper");

// console.log(dropdownBtn);
// console.log(optionsList);

const urlId = getUrlId();

/* rotateIcon(), changeButtonBorderRadiusStyle() and toggleHiddenClass() manage 
the displaying of the filter menu and its icon */
function rotateIcon() {
    if(optionsList.classList.contains("hidden")) {
        icon.classList.remove("rotate");
    } else {
        icon.classList.add("rotate");
    }
}

function changeButtonBorderRadiusStyle() {
    if(optionsList.classList.contains("hidden")) {
        dropdownBtn.style.borderRadius = "5px";
    } else {
        dropdownBtn.style.borderRadius = "5px 5px 0 0";
    }
}

function toggleHiddenClass() {
    optionsList.classList.toggle("hidden");
}

dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    //console.log(e.target);
    toggleHiddenClass();
    changeButtonBorderRadiusStyle();
    rotateIcon();
});


document.body.addEventListener("click", () => {
    optionsList.classList.add("hidden");
    changeButtonBorderRadiusStyle();
    rotateIcon();
});

window.addEventListener("keyup", (e) => {
    if(e.key === "Escape" && !optionsList.classList.contains("hidden")) {
        //console.log("close filter");
        optionsList.classList.add("hidden");
        changeButtonBorderRadiusStyle();
        rotateIcon();
    }
})

/**
 * Call displayMedia() from photographer.js with a new filtered array of media
 * to update the page
 * @param {string} filterOption 
 */
async function updateMedia(filterOption) {
    const filteredMedia = await filterMedia(filterOption);
    displayMedias(filteredMedia, urlId);
}

/**
 * Filter the media from json file based on the selected filter
 * @param {string} filterOption data-value of selected filter
 * @returns {Promise<Array>} filteredMedia or media if no filter
 */
async function filterMedia(filterOption) {
    let filteredMedia = [];
    const { media } = await getPhotographersInfosAndMedias();
    switch(filterOption) {
        case "Popularité":
            // Sort from most popular to less popular
            filteredMedia = media.sort((a,b) => b.likes - a.likes);
            return filteredMedia;

        case "Date":
            // Sort form most recent to less recent
            filteredMedia = media.sort((a,b) => new Date(b.date) - new Date(a.date));
            return filteredMedia;

        case "Titre":
            // Alphabetical sort
            filteredMedia = media.sort((a,b) => a.title.localeCompare(b.title));
            return filteredMedia;
        
        default:
            return media;
    }
}

optionsItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownBtn.value = e.target.textContent;
        const filterOption = dropdownBtn.value;
        //console.log(filterOption);
        updateMedia(filterOption);
        toggleHiddenClass();
        changeButtonBorderRadiusStyle();
        rotateIcon();
    });
});

optionsItems.forEach(item => {
    item.addEventListener("keyup", (e) => {
        if(e.key === 'Enter') {
            e.stopPropagation();
            dropdownBtn.value = e.target.textContent;
            const filterOption = dropdownBtn.value;
            console.log(filterOption);
            updateMedia(filterOption);
            toggleHiddenClass();
            changeButtonBorderRadiusStyle();
            rotateIcon();
        }
    });
});
