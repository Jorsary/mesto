export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  setItems(items) {
    this._renderedItems = items.reverse();
  }

  addItem(item) {
    const card = this._renderer(item)
    this._container.prepend(card);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this.addItem(item);
    });
  }
}
