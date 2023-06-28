import './index.css'

import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



const buttonOpenPopupProfile = document.querySelector('.profile__edit-button_popup_opened');

const profileForm = document.querySelector('.popup__form_type_profile');
const cardForm = document.querySelector('.popup__form_type_place');

const inputNameFormPopupProfile= document.querySelector('.popup__input_el_name');
const inputJobFormPopupProfile= document.querySelector('.popup__input_el_job');

const config = {
    formSelector: '.popup__form',
       inputSelector: '.popup__input',
       submitButtonSelector: '.popup__save-btn',
       inactiveButtonClass: 'popup__save-btn_inactive',
       inputErrorClass: 'popup__input_type_error',
       errorClass: 'popup__input-error_active'
   };



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Архыз'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Челябинская область'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Иваново'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Камчатка'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Холмогорский район'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Байкал'
    }
  ];



const buttonAddCard = document.querySelector('.profile__add-button');


const userProfile = new UserInfo({
  userNameSelector: 'profile__title',
  userDescriptionSelector: 'profile__subtitle'
});

const profilePopup = new PopupWithForm ( document.querySelector('.popup_type_profile-edit'), {
  handleFormSubmit: (formData) => {
    userProfile.setUserInfo(formData);
    profilePopup.close();
}
});
profilePopup.setEventListeners();

const cardsPopup = new PopupWithForm(document.querySelector('.popup_type_add-card'), {
  handleFormSubmit: (formData) => {
    const card = makeCard(formData);
    const cardElement = card.generateCard();
    sectionCards.addItem(cardElement);
    cardsPopup.close();
  }
} 
);
cardsPopup.setEventListeners();
const imagePopup = new PopupWithImage (document.querySelector('.popup_type_view-image'));
imagePopup.setEventListeners();


const cardsContainer = document.querySelector('.elements__group');


const sectionCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = makeCard(item);
    const cardElement = card.generateCard();
    sectionCards.addItem(cardElement)
  }
}, cardsContainer);

sectionCards.renderItems();


function makeCard (data) {
    const cardElement = new Card (data, '#photo-template', {
      handleCardClick: () => {

        imagePopup.open(data);
      }
    });
    return cardElement;
  }



const profileValidate = new FormValidator(config, profileForm);
profileValidate.enableValidation();

const cardValidate = new FormValidator(config, cardForm);
cardValidate.enableValidation();



buttonOpenPopupProfile.addEventListener('click', () => {
  const user = userProfile.getUserInfo();
  inputNameFormPopupProfile.value = user.userName;
  inputJobFormPopupProfile.value = user.userDescription;
    profilePopup.open();
});

buttonAddCard.addEventListener('click', () => {
  cardValidate.resetFormValidation();
    cardsPopup.open();
});





/*function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = inputNameFormPopupProfile.value;
    profileJob.textContent = inputJobFormPopupProfile.value;
    
}
profileForm.addEventListener('submit', handleProfileFormSubmit);*/




/*export function openPopup(popup) {
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
}

*/

  /*initialCards.forEach((item) => {
    const photoElement = makeCard (item);
    cardsContainer.prepend(photoElement);
  })*/

 /* function addCard (evt) {
    evt.preventDefault();
    const cardContainer = {};
    cardContainer.name = inputNamePopupCard.value;
    cardContainer.link = inputUrlPopupCard.value;
    
    cardsContainer.prepend(makeCard (cardContainer));
  //  evt.target.reset();
    cardsPopup.close();
    }

  //  cardForm.addEventListener('submit', addCard);
*/