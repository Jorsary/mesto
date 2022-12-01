export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.aboutSelector = document.querySelector(aboutSelector);
  }
  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      about: this.aboutSelector.textContent,
    };
  }
  setUserInfo(userInfo){
    this.id = userInfo._id
    this.nameElement.textContent = userInfo.name
    this.aboutSelector.textContent = userInfo.about
  }

}
