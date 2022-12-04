export default class Api {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  async _fetch(path, method, body) {
    const options = {
      ...this._options,
      method,
      body: JSON.stringify(body),
    };
    const responce = fetch(this._baseUrl + path, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

    return responce;
  }

  getUser() {
    return this._fetch("/users/me", "GET");
  }

  getCards() {
    return this._fetch("/cards", "GET");
  }

  editProfie({ name, about }) {
    return this._fetch("/users/me", "PATCH", { name, about });
  }

  editAvatar(avatar) {
    return this._fetch(`/users/me/avatar`, "PATCH", avatar);
  }

  createNewCard({ name, link }) {
    return this._fetch("/cards", "POST", { name, link });
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, "DELETE");
  }

  setLike(id) {
    return this._fetch(`/cards/${id}/likes`, "PUT");
  }

  removeLike(id) {
    return this._fetch(`/cards/${id}/likes`, "DELETE");
  }
}
