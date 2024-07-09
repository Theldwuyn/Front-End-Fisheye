export class PhotographerTemplate {
    constructor(data) {
        this.name = data.name;
        this.picture = `assets/Sample Photos/Photographers ID Photos/${data.portrait}`
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
    }

    getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const userCardContent = `
            <a class="img-container" href="photographer.html?id=${this.id}">
                <img src="${this.picture}" alt="${this.name}">
            </a>
            <h2>${this.name}</h2>
            <p class="red-font">${this.city}, ${this.country}</p>
            <p>${this.tagline}</p>
            <p class="grey-font">${this.price}€/jour
            `;

        article.innerHTML = userCardContent;
        //console.log(article);
        
        return (article);
    }

    createPhotographerHeader() {
        const headerContentWrapper = document.querySelector(".photograph-header__content");
        const headerImgWrapper = document.querySelector(".photograph-header__img");
        headerImgWrapper.classList.add("img-container");

        const headerContent = `
            <h1>${this.name}</h1>
            <p class="red-font location">${this.city}, ${this.country}</p>
            <p class="grey-font">${this.tagline}</p>
            `;
        const imgContent = `
            <img src="${this.picture}" alt="${this.name}">
            `;
        headerContentWrapper.innerHTML = headerContent;
        headerImgWrapper.innerHTML = imgContent;
    }
}

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
    }

    getVideoCard() {
        const article = document.createElement('article');
        article.classList.add("media-card");
        const video = `assets/Sample Photos/${this.photographerId}/${this.video}`;
        const videoCardContent = `
            <video controls class="media-card__media">
                <source src="${video}" type="video/mp4">
            </video>
            <div class="media-card__content">
                <p class="red-font card-title">${this.title}</p>
                <p>${this.likes}
                    <i class="fa-solid fa-heart red-font"></i>
                </p>
            </div>
            `;
        article.innerHTML = videoCardContent;
        return article;
    }
}

export class Photos extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    getPhotoCard() {
        const article = document.createElement('article');
        article.classList.add("media-card");
        const photo = `assets/Sample Photos/${this.photographerId}/${this.image}`;
        const photoCardContent = `
            <img src="${photo}" alt="${this.title}" class="media-card__media">
            <div class="media-card__content">
                <p class="red-font card-title">${this.title}</p>
                <p>${this.likes}
                    <i class="fa-solid fa-heart red-font"></i>
                </p>
            </div>
            `;
        article.innerHTML = photoCardContent;
        return article;
    }
}
