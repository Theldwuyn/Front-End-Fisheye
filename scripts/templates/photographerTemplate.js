export class PhotographerTemplate {
    constructor(data) {
        this.name = data.name;
        this.picture = `assets/Sample_Photos/Photographers_ID_Photos/${data.portrait}`
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
    }

    getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const userCardContent = `
            <a href="photographer.html?id=${this.id}">
                <div class="img-container">
                    <img src="${this.picture}" alt="${this.name}">
                </div>
                <h2>${this.name}</h2>
            </a>
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
            <h2 class="red-font location">${this.city}, ${this.country}</h2>
            <p class="grey-font">${this.tagline}</p>
            `;
        const imgContent = `
            <img src="${this.picture}" alt="${this.name}">
            `;
        headerContentWrapper.innerHTML = headerContent;
        headerImgWrapper.innerHTML = imgContent;
    }
}
