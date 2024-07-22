import { Videos, Photos } from "../templates/MediaTemplate.js";

export class MediaFactory {
    constructor(data) {
        if(data.image) {
            const mediaObject = new Photos(data);
            const card = mediaObject.getPhotoCard();
            return { mediaObject, card };

        } else if (data.video) {
            const mediaObject = new Videos(data);
            const card = mediaObject.getVideoCard();
            return { mediaObject, card };
            
        } else {
            throw new Error('Unknown media type');
        }
    }
}