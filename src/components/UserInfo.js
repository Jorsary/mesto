export default class UserInfo {
  constructor({ nameSelector, StatusSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.StatusSelector = document.querySelector(StatusSelector);
  }
  getUserInfo() {
    console.log()
    return {
      name: this.nameElement.textContent,
      status: this.StatusSelector.textContent,
    };
  }
  setUserInfo(userInfo){
    this.nameElement.textContent = userInfo.name
    this.StatusSelector.textContent = userInfo.about
  }
}
