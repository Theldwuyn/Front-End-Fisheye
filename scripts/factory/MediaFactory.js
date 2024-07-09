import { Videos, Photos } from "../templates/photographerTemplate.js"

export class MediaFactory {
    constructor(data) {
        if(data.image) {
            const media = new Photos(data);
            const card = media.getPhotoCard();
            return card;
        } else if (data.video) {
            const media = new Videos(data);
            const card = media.getVideoCard();
            return card;
        } else {
            throw new Error('Unknown media type');
        }
    }
}