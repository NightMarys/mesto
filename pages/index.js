const openPopupProfileEditBtn = document.querySelector('.profile__edit-button_popup_opened');
const popupCloseProfileBtn = document.querySelector('.popup__close-btn_type_profile');
const popupCloseCardBtn = document.querySelector('.popup__close-btn_type_card');
const popupCloseImageBtn = document.querySelector('.popup__close-btn_type_image');

const profileForm = document.querySelector('.popup__form_type_profile');
const cardForm = document.querySelector('.popup__form_type_place');

const popupName = document.querySelector('.popup__input_el_name');
const popupJob = document.querySelector('.popup__input_el_job');
const popupPhotoName = document.querySelector('.popup__input_el_place');
const popupPhotoUrl = document.querySelector('.popup__input_el_url');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');


const addCardBtn = document.querySelector('.profile__add-button');
const popupCardBtn = document.querySelector('.popup__save-card-btn');

const closeButtons = document.querySelectorAll('.popup__close-btn');

const profilePopup = document.querySelector('.popup_type_profile-edit');
const cardsPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_view-image');

const openImagePopup = document.querySelector('.element__image');

const popupImage = document.querySelector('.popup__image');
const popupPhotoTitle = document.querySelector('.popup__photo-title');

const popup = document.querySelector('.popup');

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
}

function closePopup(popup) {
    popup.classList.remove('popup_opened'); 
}

function handleClosePopup(evt) {
    const isOverlay = evt.target.classList.contains('popup_opened');
    const isCloseBtn = evt.target.classList.contains('popup__close-btn');
    
    if (isOverlay || isCloseBtn) {
        popupList.forEach(closePopup)
    } 
}
document.addEventListener('click', handleClosePopup)


document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        popupList.forEach(closePopup)
    }
  }); 

openPopupProfileEditBtn.addEventListener('click', () => {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    openPopup(profilePopup);
});

addCardBtn.addEventListener('click', () => {

    openPopup(cardsPopup);
});


function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    evt.target.reset();
    closePopup(profilePopup);
}
profileForm.addEventListener('submit', handleFormSubmit);