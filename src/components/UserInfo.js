export default class UserInfo {
  constructor({ nameSelector, aboutSelector,avatarSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.aboutSelector = document.querySelector(aboutSelector);
    this.avatarSelector = document.querySelector(avatarSelector);
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

  setAvatar(link) {
    this.avatarSelector.src = link
  }

}
