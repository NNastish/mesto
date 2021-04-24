
//Класс UserInfo отвечает за управление отображением информации о пользователе на странице


export default class UserInfo {
    constructor( {userNameSelector, userInfoSelector} ) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userInfoSelector = document.querySelector(userInfoSelector);
    }

    //публичный метод getUserInfo, который возвращает объект с данными пользователя.
    getUserInfo() {
        return {
            userName: this._userNameSelector.textContent,
            userInfo: this._userInfoSelector.textContent
        }
    }

    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, about }) {
        this._userNameSelector.textContent = name;
        this._userInfoSelector.textContent = about;
    }
}
