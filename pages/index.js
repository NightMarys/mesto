const openPopupBtn = document.querySelector('.profile__editbutton_popup-open');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_name');
let popupJob = document.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let popupEditBtn = document.querySelector('.popup__save-btn');


popupName.value = profileName.textContent;
popupJob.value = profileJob.textContent;

function openPopup() {   
    popup.classList.add('popup_opened');
}

function closePopup(evt) {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__close-btn');
    
    if (isOverlay || isCloseBtn) {
        popup.classList.remove('popup_opened'); 
    } 
}

openPopupBtn.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);
popupCloseBtn.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    popupName = document.querySelector('.popup__input_name').value;
    popupJob = document.querySelector('.popup__input_job').value;

    profileName.textContent = popupName;
    profileJob.textContent = popupJob;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);




