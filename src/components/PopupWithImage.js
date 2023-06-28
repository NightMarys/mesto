import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }
    


    open({link, name}) {
      const popupImage = this._popup.querySelector('.popup__image');
      const popupPhotoTitle = this._popup.querySelector('.popup__photo-title');
       popupImage.src = link;
      popupImage.alt = name;
       popupPhotoTitle.textContent = name;
        super.open();
    }
}