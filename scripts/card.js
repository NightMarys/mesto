import { openPopup} from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._image = data.link;
    this._name = data.name;

this._popupImage = document.querySelector('.popup__image');
this._popupPhotoTitle = document.querySelector('.popup__photo-title');
this._imagePopup = document.querySelector('.popup_type_view-image');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLike = (evt) => {
    this._likeButton.classList.toggle('element__icon_active');
  };

  _deleteCardHandler() {
    this._element.remove();
}
  _openPopupImage() {
    this._popupImage.src = this._image;
    this._popupImage.alt = this._name;
    this._popupPhotoTitle.textContent = this._name;
    openPopup(this._imagePopup)
}

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__icon');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._imageElement = this._element.querySelector('.element__image');
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCardHandler();
    });

    this._imageElement.addEventListener('click', () => {
      this._openPopupImage();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._nameElement = this._element.querySelector('.element__title');

    this._imageElement.src = this._image;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;

    return this._element;
  }
}
