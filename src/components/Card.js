export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._cardSelector = cardSelector;
    this._image = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;


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
      this._handleCardClick();
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
