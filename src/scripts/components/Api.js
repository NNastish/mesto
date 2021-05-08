
export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла ошибка в getInitialCards');
            });
    }

    getUserInfo() {
        const query = this._baseUrl + '/users/me';
        return fetch(query, {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла ошибка в getUserInfo');
            })
    }

    editProfileInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла ошибка в editProfileInfo');
            })
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла ошибка в addCard');
            })
    }

    editAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла ошибка в editAvatar');
            })
    }

    addlike(_id) {
        return fetch(this._baseUrl + '/cards/likes/' + _id, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла ошибка в addlike');
            })
    }

    deletelike(_id) {
        return fetch(this._baseUrl + '/cards/likes/' + _id, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Произошла ошибка в deletelike');
            })
    }

    deleteCard(_id) {
        return fetch(this._baseUrl + '/cards/' + _id, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch(res => {
                console.log(res + ' Ошибка');
            })
    }



}

