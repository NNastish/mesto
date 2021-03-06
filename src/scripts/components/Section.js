export default class Section {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    /*constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }*/

    //публичный метод, который отвечает за отрисовку всех элементов
    // renderItems() {
    //     this._renderedItems.forEach((item) => this._renderer(item));
    // }

    //публичный метод, который принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }

}