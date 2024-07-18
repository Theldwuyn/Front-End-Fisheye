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
        this.video = data.video
        this.source = `assets/Sample Photos/${this.photographerId}/${this.video}`
    }

    getVideoCard() {
        const article = document.createElement('article');
        article.classList.add("media-card");
        const videoCardContent = `
            <video controls class="media-card__media">
                <source src="${this.source}" type="video/mp4">
            </video>
            <div class="media-card__content">
                <p class="red-font media-card__content--title">${this.title}</p>
                <p class="media-card__content--likeBtn">${this.likes}
                    <i class="fa-solid fa-heart red-font" aria-label="likes"></i>
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
        this.source = `assets/Sample Photos/${this.photographerId}/${this.image}`;
    }

    getPhotoCard() {
        const article = document.createElement('article');
        article.classList.add("media-card");
        const photoCardContent = `
            <img src="${this.source}" alt="${this.title}" class="media-card__media">
            <div class="media-card__content">
                <p class="red-font media-card__content--title">${this.title}</p>
                <p class="media-card__content--likeBtn">${this.likes}
                    <i class="fa-solid fa-heart red-font" aria-label="likes"></i>
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