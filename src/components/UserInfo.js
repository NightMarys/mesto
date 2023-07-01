export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatar }) {
    this._userNameElement = document.querySelector(`.${userNameSelector}`);
    this._userDescriptionElement = document.querySelector(`.${userDescriptionSelector}`);
    this._userAvatar = document.querySelector(`.${userAvatar}`);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userDescriptionElement.textContent,
      avatar: this._userAvatar.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
    this._userAvatar.src = avatar;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
  
  getUserId() {
    return this.myId
  }
  }