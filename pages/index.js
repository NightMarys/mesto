
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button_popup_opened');

const profileForm = document.querySelector('.popup__form_type_profile');
const cardForm = document.querySelector('.popup__form_type_place');

const popupName = document.querySelector('.popup__input_el_name');
const popupJob = document.querySelector('.popup__input_el_job');
const popupPhotoName = document.querySelector('.popup__input_el_place');
const popupPhotoUrl = document.querySelector('.popup__input_el_url');

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


const buttonAddCard = document.querySelector('.profile__add-button');

const closeButtons = document.querySelectorAll('.popup__close-btn');

const profilePopup = document.querySelector('.popup_type_profile-edit');
const cardsPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_view-image');


const popupImage = document.querySelector('.popup__image');
const popupPhotoTitle = document.querySelector('.popup__photo-title');

const btnSubmitProfile = document.querySelector('.popup__profile-btn');
const btnSubmitPlace = document.querySelector('.popup__place-btn');



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
    photoImage.alt = photoData.name;

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


    likeBtn.addEventListener('click', () => handleLike(photoData))
    deleteBtn.addEventListener('click', () => handleDelete(photoData))
    photoImage.addEventListener('click', () => openPopupImage(photoData))
    return photoElement;
};



initialCards.forEach((photo) => {
    const element = createPhotoElement(photo);

    cardsContainer.prepend(element);
})


createPhotoElement(initialCards);


function addCard (evt) {
    evt.preventDefault();
    const cardElement = {};
    cardElement.name = popupPhotoName.value;
    cardElement.link = popupPhotoUrl.value;
    
    cardsContainer.prepend(createPhotoElement(cardElement));
    evt.target.reset();
    closePopup(cardsPopup);
}

cardForm.addEventListener('submit', addCard);


const popupList = Array.from(document.querySelectorAll('.popup'));

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc); 
    
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function handleClosePopup(evt) {
    const isOverlay = evt.target.classList.contains('popup_opened');
    const isCloseBtn = evt.target.classList.contains('popup__close-btn');
    
    if (isOverlay || isCloseBtn) {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    } 
}
document.addEventListener('click', handleClosePopup)

const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}


buttonOpenPopupProfile.addEventListener('click', () => {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    openPopup(profilePopup);
});

buttonAddCard.addEventListener('click', () => {
    openPopup(cardsPopup);
});


function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    evt.target.reset();
    closePopup(profilePopup);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);


