class Media {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }
}
export class Videos extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
        this.source = `assets/Sample_Photos/${this.photographerId}/${this.video}`;
        this.track = `assets/Sample_Photos/${this.photographerId}/${this.video.replace(".mp4", ".fr.vtt")}`
    }

    getVideoCard() {
        const article = document.createElement('article');
        article.classList.add("media-card");
        const videoCardContent = `
            <video controls class="media-card__media" tabindex="0" title="${this.title}" aria-label="${this.title}">
                <source src="${this.source}" type="video/mp4">
                <track default kind="captions" src="${this.track}" srclang="fr">
            </video>
            <div class="media-card__content">
                <h3 class="red-font media-card__content--title">${this.title}</h3>
                <p class="media-card__content--likeBtn">${this.likes}
                    <span class="fa-solid fa-heart red-font media-card__content--likeBtn" role="img" aria-label="likes" tabindex="0"></span>
                </p>
            </div>
            `;
        article.innerHTML = videoCardContent;
        return article;
    }

    getVideoLightbox() {
        const videoLightbox = `
            <video controls class="lightbox-media">
                <source src="${this.source}" type="video/mp4">
                <track default kind="captions" src="${this.track}" srclang="fr">
            </video>
            <p class="lightbox-media__caption red-font">${this.title}</p>
            `;
        return videoLightbox;
    }
}

export class Photos extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
        this.source = `assets/Sample_Photos/${this.photographerId}/${this.image}`;
    }

    getPhotoCard() {
        const article = document.createElement('article');
        article.classList.add("media-card");
        const photoCardContent = `
            <img src="${this.source}" alt="${this.title}" class="media-card__media" tabindex="0" aria-label="${this.title} - Cliquez pour une vue zoomé">
            <div class="media-card__content">
                <h3 class="red-font media-card__content--title">${this.title}</h3>
                <p class="media-card__content--likeBtn">${this.likes}
                    <span class="fa-solid fa-heart red-font media-card__content--likeBtn" role="img" aria-label="likes" tabindex="0"></span>
                </p>
            </div>
            `;
        article.innerHTML = photoCardContent;
        return article;
    }

    getPhotoLightbox() {
        const photoLightbox = `
            <img src="${this.source}" alt="${this.title}" class="lightbox-media">
            <p class="lightbox-media__caption red-font">${this.title}</p>
            `;
        return photoLightbox;
    }
}