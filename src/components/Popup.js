export default class Popup {
    constructor(popupSelector) {
      this._popup = popupSelector;
    }



    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose); 
        
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClosePopup = (evt) => {
   
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleClosePopup)
    }
}








/*function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc); 
    
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

const handleClosePopup = () => {
  popupList.forEach(popup => {
      popup.addEventListener('click', evt => {
          if(evt.target.classList.contains('popup_opened')) {
              closePopup(popup);
          }
          if (evt.target.classList.contains('popup__close-btn')) {
              closePopup(popup);
          }
      })
  })
}


handleClosePopup();

const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}*/