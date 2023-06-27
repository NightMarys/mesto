import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.popup__image');
      this._popupPhotoTitle = this._popup.querySelector('.popup__photo-title');
    }
    


    open(data) {
        this._popupImage.src = data.image;
        this._popupImage.alt = data.name;
        this._popupPhotoTitle = data.name;
        super.open();
    }
}