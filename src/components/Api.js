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
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return responce;
  }

  getUser() {
    return this._fetch("/users/me", "GET");
  }

  getCards() {
    return this._fetch("/cards", "GET");
  }

  editProfie(name, status) {
    return this._fetch("/users/me", "PATCH", { name, status });
  }

  createNewCard(name, link) {
    return this._fetch("/cards", "POST", { name, link });
  }
}
