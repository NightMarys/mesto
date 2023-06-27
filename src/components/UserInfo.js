export default class UserInfo {
    constructor(infoSelectors) {
      this._userName = infoSelectors.name.textContent;
      this._userAbout = infoSelectors.about.textContent;;
    }
  
    getUserInfo() {
      this._userInfo = {};
      this._userInfo.name = this._userName;
      this._userInfo.about = this._userAbout;
      return this._userInfo;
    }
  
    setUserInfo(user) {
        this._userName = user.name;
        this._userAbout = user.about;
    }
  }