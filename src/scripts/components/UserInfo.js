
//Класс UserInfo отвечает за управление отображением информации о пользователе на странице


export default class UserInfo {
    constructor( {userNameSelector, userInfoSelector} ) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    //публичный метод getUserInfo, который возвращает объект с данными пользователя.
    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userInfo: this._userInfo.textContent
        }
    }

    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userInfo.textContent = about;
    }
}
