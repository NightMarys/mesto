import './index.css'

import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirmation from '../components/PopupConfirmation';

import { token, cohort } from '../utils/authorizationData';
import Api from '../components/Api';


const buttonOpenPopupProfile = document.querySelector('.profile__edit-button_popup_opened');
const buttonChangeAvatar = document.querySelector('.profile__avatar-edit-button');
const profileForm = document.querySelector('.popup__form_type_profile');
const cardForm = document.querySelector('.popup__form_type_place');
const avatarForm = document.querySelector('.popup__form_type_avatar');

const inputNameFormPopupProfile = document.querySelector('.popup__input_el_name');
const inputJobFormPopupProfile = document.querySelector('.popup__input_el_job');
const inputFormPopupAvatar = document.querySelector('.popup__input_el_avatar');

const saveBtnProfile = document.querySelector('.popup__profile-btn');
const saveBtnAvatar = document.querySelector('.popup__avatar-btn');
const saveBtnCard = document.querySelector('.popup__place-btn');

const config = {
    formSelector: '.popup__form',
       inputSelector: '.popup__input',
       submitButtonSelector: '.popup__save-btn',
       inactiveButtonClass: 'popup__save-btn_inactive',
       inputErrorClass: 'popup__input_type_error',
       errorClass: 'popup__input-error_active'
   };

   const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });

  let myId = "";

  Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
     userProfile.setUserInfo(userData);
    myId = userData._id;
     sectionCards.renderItems(cards)
    })
    .catch(err => console.log(err))


    function renderLoading(isLoading, button) {
      if (isLoading) {
        button.textContent = "Сохранение..";
      } else {
        button.textContent = "Сохранить";
      }
    }


const buttonAddCard = document.querySelector('.profile__add-button');

const userProfile = new UserInfo({
  userNameSelector: 'profile__title',
  userDescriptionSelector: 'profile__subtitle'
});

const profilePopup = new PopupWithForm ( document.querySelector('.popup_type_profile-edit'), {
  handleFormSubmit: (formData) => {
    renderLoading(true, saveBtnProfile);
    api.patchUserInfo(formData)
    .then(formData => {
      userProfile.setUserInfo(formData);
      profilePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, saveBtnProfile);
    });
}
});
profilePopup.setEventListeners();

const deleteCardPopup = new PopupConfirmation ( document.querySelector('.popup_type_delete-confirmation'));
deleteCardPopup.setEventListeners();

const profileAvatar = document.querySelector('.profile__image');

const avatarPopup = new PopupWithForm ( document.querySelector('.popup_type_update-avatar'), {
  handleFormSubmit: (formData) => {
    renderLoading(true, saveBtnAvatar);
    api.patchAvatar(formData)
    .then(formData => {
      profileAvatar.style.backgroundImage = `url(${formData.avatar})`;
      avatarPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, saveBtnAvatar);
    })
}
});
avatarPopup.setEventListeners();


const cardsPopup = new PopupWithForm(document.querySelector('.popup_type_add-card'), {
  handleFormSubmit: (data) => {
    renderLoading(true, saveBtnCard);
    api.postNewCard(data)
    .then(data => {
      const card = makeCard(data);
    const cardElement = card.generateCard();
    sectionCards.addItem(cardElement);
    cardsPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, saveBtnCard);
    })
  }
});
cardsPopup.setEventListeners();

const imagePopup = new PopupWithImage (document.querySelector('.popup_type_view-image'));
imagePopup.setEventListeners();


const cardsContainer = document.querySelector('.elements__group');


const sectionCards = new Section({
  renderer: (item) => {
    const card = makeCard(item);
    const cardElement = card.generateCard();
    sectionCards.addItem(cardElement)
  }
}, cardsContainer);


function makeCard (data) {
    const cardElement = new Card ({
      data: data, 
      userId: myId,
      cardSelector: '#photo-template', 
      handleCardClick: () => {
        imagePopup.open(data);
      },
      handleLike: () => {
        api.putLike(data._id)
            .then((data) => {
              cardElement.counterLike(data.likes);
              cardElement.toggleLike();
            })
            .catch((err) => {
              console.log(err);
            })
      },
      handleLikeRemover: () => {
        api.deleteLike(data._id)
        .then((data) => {
          cardElement.counterLike(data.likes);
          cardElement.toggleLike();
        })
        .catch((err) => {
          console.log(err);
        })
      },
      deleteCardHandler: () => {
        deleteCardPopup.open();
        deleteCardPopup.setFormSubmitHandler((evt) => {
          evt.preventDefault();
          cardElement.remove();
         deleteCardPopup.close()
       })
      }
});
    return cardElement;
  }



const profileValidate = new FormValidator(config, profileForm);
profileValidate.enableValidation();

const cardValidate = new FormValidator(config, cardForm);
cardValidate.enableValidation();

const avatarValidate = new FormValidator(config, avatarForm);
avatarValidate.enableValidation();




buttonOpenPopupProfile.addEventListener('click', () => {
  const user = userProfile.getUserInfo();
  inputNameFormPopupProfile.value = user.name;
  inputJobFormPopupProfile.value = user.about;
    profilePopup.open();
});

buttonAddCard.addEventListener('click', () => {
  cardValidate.resetFormValidation();
    cardsPopup.open();
});

buttonChangeAvatar.addEventListener('click', () => {
  avatarPopup.open();
});