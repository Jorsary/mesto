export default class UserInfo {
  constructor({ nameSelector, aboutSelector,avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutSelector.textContent,
    };
  }
  setUserInfo({ name, about, avatar, _id }){
    this.id = _id
    this._nameElement.textContent = name
    this._aboutSelector.textContent = about
    this._avatarSelector.src = avatar

  }


}
