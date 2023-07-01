import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._confirmBtn = this._popup.querySelector('.popup__confirm-btn');
      
    }
    
    setFormSubmitHandler(action) {
        this._handleFormSubmit = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this._confirmBtn.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit;
        })
      }

}