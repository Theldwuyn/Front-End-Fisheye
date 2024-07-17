import { getPhotographers } from "../API/api.js";
import { displayMedias, getUrlId } from "../pages/photographer.js";

const selectWrapper = document.querySelector(".select-wrapper");
const selected = document.querySelector(".select-wrapper__selected");
const options = document.getElementById("options");
const icon = document.querySelector(".select-wrapper__icon");

const urlId = getUrlId();

function rotateIcon() {
    if(options.classList.contains("hidden")) {
        icon.classList.remove("rotate");
    } else {
        icon.classList.add("rotate");
    }
}

function toggleHiddenClass() {
    options.classList.toggle("hidden");
}

selectWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleHiddenClass();
    rotateIcon();
});

document.body.addEventListener("click", () => {
    options.classList.add("hidden");
    rotateIcon();
});

async function updateMedia(filterOption) {
    const filteredMedia = await filterMedia(filterOption);
    displayMedias(filteredMedia, urlId);
}

async function filterMedia(filterOption) {
    let filteredMedia = [];
    const { media } = await getPhotographers();
    switch(filterOption) {
        case "popularity":
            filteredMedia = media.sort(function(a,b) {
                return b.likes - a.likes;
            });
            return filteredMedia;

        case "date":
            filteredMedia = media.sort(function(a,b) {
                return new Date(b.date) - new Date(a.date);
            });
            return filteredMedia;

        case "title":
            filteredMedia = media.sort(function(a,b) {
                return a.title.localeCompare(b.title);
            });
            return filteredMedia;
        
        default:
            return media;
    }
}

options.addEventListener("click", (e) => {
    e.stopPropagation();
    selected.textContent = e.target.textContent;
    const filterOption = e.target.getAttribute("data-value");
    updateMedia(filterOption);
    toggleHiddenClass();
    rotateIcon();
});
