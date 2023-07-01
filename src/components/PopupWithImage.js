import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.popup__image');
      this._popupPhotoTitle = this._popup.querySelector('.popup__photo-title');
    }
    


    open({link, name}) {
      this._popupImage.src = link;
      this._popupImage.alt = name;
      this._popupPhotoTitle.textContent = name;
        super.open();
    }
}