export default class Card {
  constructor({data, userId, cardSelector, handleCardClick, 
    handleLike, handleLikeRemover,
    deleteCardHandler}) {
    this._cardSelector = cardSelector;
    this._image = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleLikeRemover = handleLikeRemover;
    this._deleteCardHandler = deleteCardHandler;
    this._likes = data.likes;
    
    this._myId = userId;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }


  counterLike(likeArray) {
    const counterValue = this._element.querySelector('.element__likes-counter')
    counterValue.textContent = likeArray.length;
  }

  _setLike() {
    const like = this._element.querySelector('.element__icon');
 
    if (like.classList.contains('element__icon_active')) {
      this._handleLikeRemover()
    } else {
      this._handleLike()
    }
}

  toggleLike () {
    this._element.querySelector('.element__icon').classList.toggle('element__icon_active');
  };


  isLiked() {
    if (this._likes.some((like) => like._id === this._myId)) {
      this._element.querySelector('.element__icon').classList.add('element__icon_active');
    }
  }

  removeCard() {
    this._element.remove();
  } 

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__icon');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._imageElement = this._element.querySelector('.element__image');

    this._likeButton.addEventListener('click', () => {
      this._setLike();
    });

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick();
   });

   if (this._ownerId === this._myId) {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardHandler();
    });
   } else {
    this._deleteButton.remove();
   }

  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._nameElement = this._element.querySelector('.element__title');
    this._imageElement.src = this._image;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    this._likesCounter = this._element.querySelector('.element__likes-counter');
    this._likesCounter.textContent = this._likes.length;
    this.isLiked();
    return this._element;
  }
}
