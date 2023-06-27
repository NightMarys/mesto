import './index.css'

import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



const buttonOpenPopupProfile = document.querySelector('.profile__edit-button_popup_opened');

const profileForm = document.querySelector('.popup__form_type_profile');
const cardForm = document.querySelector('.popup__form_type_place');
//const submitButton = document.querySelector('.popup__save-btn');

const popupName = document.querySelector('.popup__input_el_name');
const popupJob = document.querySelector('.popup__input_el_job');
const popupPhotoName = document.querySelector('.popup__input_el_place');
const popupPhotoUrl = document.querySelector('.popup__input_el_url');

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
  
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupImage = document.querySelector('.popup__image');
const buttonAddCard = document.querySelector('.profile__add-button');
const btnSubmitProfile = document.querySelector('.popup__profile-btn');
const btnSubmitPlace = document.querySelector('.popup__place-btn');
const closeButtons = document.querySelectorAll('.popup__close-btn');

const userProfile = new UserInfo({
  name: profileName,
  about: profileJob
});

const profilePopup = new PopupWithForm ( document.querySelector('.popup_type_profile-edit'), {
  handleFormSubmit: (formData) => {
    userProfile.setUserInfo(formData);
}
});
profilePopup.setEventListeners();

const cardsPopup = new PopupWithForm(document.querySelector('.popup_type_add-card'), {
  handleFormSubmit: (formData) => {
  }
} 
);
cardsPopup.setEventListeners();
const imagePopup = new PopupWithImage (document.querySelector('.popup_type_view-image'));
imagePopup.setEventListeners();



const photoTemplate = document.getElementById('photo-template'); 
 const likeBtn = photoTemplate.querySelector('.element__icon');

const cardsContainer = document.querySelector('.elements__group');


const popupList = Array.from(document.querySelectorAll('.popup'));
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


const sectionCards = new Section({
  items: initialCards,
  renderer: (item) => sectionCards.addItem(makeCard(item))
}, cardsContainer);




const makeCard = (data) => {
    const cardElement = new Card (data, '#photo-template', {
      handleCardClick: () => {

        imagePopup.open();
      }
    }
      ).generateCard();
    return cardElement;

  }

  initialCards.forEach((item) => {
    const photoElement = makeCard (item);
    cardsContainer.prepend(photoElement);
  })

  function addCard (evt) {
    evt.preventDefault();
    const cardContainer = {};
    cardContainer.name = popupPhotoName.value;
    cardContainer.link = popupPhotoUrl.value;
    
    cardsContainer.prepend(makeCard (cardContainer));
    evt.target.reset();
    cardsPopup.close();
    }

    cardForm.addEventListener('submit', addCard);


const profileValidate = new FormValidator(config, profileForm);
profileValidate.enableValidation();

const cardValidate = new FormValidator(config, cardForm);
cardValidate.enableValidation();



buttonOpenPopupProfile.addEventListener('click', () => {
  const user = userProfile.getUserInfo();
  popupName.value = user.name;
  popupJob.value = user.about;
    profilePopup.open();
});

buttonAddCard.addEventListener('click', () => {
  cardValidate.resetFormValidation();
    cardsPopup.open();
});


function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    
}
profileForm.addEventListener('submit', handleProfileFormSubmit);




