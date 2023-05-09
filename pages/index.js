const openPopupProfileEditBtn = document.querySelector('.profile__edit-button_popup_opened');
const popupCloseProfileBtn = document.querySelector('.popup__close-profile-btn');
const popupCloseCardBtn = document.querySelector('.popup__close-card-btn');
const popupCloseImageBtn = document.querySelector('.popup__close-image-btn');

let formElement = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_el_name');
let popupJob = document.querySelector('.popup__input_el_job');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

const popupEditBtn = document.querySelector('.popup__save-btn');
const addCardBtn = document.querySelector('.profile__add-button');
const popupCardBtn = document.querySelector('.popup__save-card-btn');



const profilePopup = document.querySelector('.popup__profile-edit');
const cardsPopup = document.querySelector('.popup__add-card');
const imagePopup = document.querySelector('.popup__view-image');

const openImagePopup = document.querySelector('.element__image');

const popupImage= document.querySelector('.popup__image');
const popupPhotoTitle= document.querySelector('.popup__photo-title');


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

const photoTemplate = document.getElementById('photo-template');
const cardsContainer = document.querySelector('.elements__group');

const createPhotoElement = (photoData) => {
    const photoElement = photoTemplate.content.querySelector('.element').cloneNode(true);

    const photoImage = photoElement.querySelector('.element__image');
    const photoTitle = photoElement.querySelector('.element__title');
    const likeBtn = photoElement.querySelector('.element__icon');
    const deleteBtn = photoElement.querySelector('.element__delete-btn');

    photoTitle.textContent = photoData.name;
    photoImage.src = photoData.link;
    photoImage.alt = photoData.alt;

    const handleLike = (evt) => {
        likeBtn.classList.toggle('element__icon_active');
    };

    const handleDelete = () => {
        photoElement.remove();
    };

    const openPopupImage = () => {
        popupImage.src = photoData.link;
        popupImage.alt = photoData.name;
        popupPhotoTitle.textContent = photoData.name;
        openPopup(imagePopup)
    }

    likeBtn.addEventListener('click', handleLike);
    deleteBtn.addEventListener('click', handleDelete);

    photoImage.addEventListener('click', openPopupImage)
    
    return photoElement;
};



initialCards.forEach((photo) => {
    const element = createPhotoElement(photo);

    cardsContainer.prepend(element);
})


createPhotoElement(initialCards);


popupCardBtn.addEventListener('click', addCard = (evt) =>{
    evt.preventDefault();
    const newCard = photoTemplate.content.querySelector('.element').cloneNode(true);
    const popupPhotoName = document.querySelector('.popup__input_el_place').value;
    const popupPhotoUrl = document.querySelector('.popup__input_el_url').value;

    const cardImage = newCard.querySelector('.element__image');
    const cardTitle = newCard.querySelector('.element__title');

    cardTitle.textContent = popupPhotoName;
    cardImage.src = popupPhotoUrl;
    cardImage.alt = popupPhotoName;

    createPhotoElement(newCard);
    
    cardsContainer.prepend(newCard);

    closePopup(cardsPopup);
})



popupName.value = profileName.textContent;
popupJob.value = profileJob.textContent;




function openPopup(popup) {   
    popup.classList.add('popup_opened');
}



function closePopup(popup) {
    popup.classList.remove('popup_opened'); 
}

openPopupProfileEditBtn.addEventListener('click', () => {
    openPopup(profilePopup);
});

addCardBtn.addEventListener('click', () => {
    openPopup(cardsPopup);
});


popupCloseProfileBtn.addEventListener('click', () => {
    closePopup(profilePopup);
});

popupCloseCardBtn.addEventListener('click', () => {
    closePopup(cardsPopup);
});

popupCloseImageBtn.addEventListener('click', () => {
    closePopup(imagePopup);
});



function handleFormSubmit (evt) {
    evt.preventDefault();
    popupName = document.querySelector('.popup__input_el_name').value;
    popupJob = document.querySelector('.popup__input_el_job').value;

    profileName.textContent = popupName;
    profileJob.textContent = popupJob;
    closePopup(profilePopup);
}
formElement.addEventListener('submit', handleFormSubmit);