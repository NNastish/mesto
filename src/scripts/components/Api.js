
export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: {
                authorization: this._headers.authorization
            }
        })
            // .then(res => {
            //     if (res.ok) {
            //         return res.json();
            //     }
            //     return Promise.reject('Произошла ошибка в getInitialCards');
            // });
            .then(this._getResponseData);
    }

    getUserInfo() {
        const query = this._baseUrl + '/users/me';
        return fetch(query, {
            headers: {
                authorization: this._headers.authorization
            }
        })
            .then(this._getResponseData);
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
            .then(this._getResponseData);
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
            .then(this._getResponseData);
    }

    editAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._getResponseData);
    }

    addlike(_id) {
        return fetch(this._baseUrl + '/cards/likes/' + _id, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(this._getResponseData);
    }

    deletelike(_id) {
        return fetch(this._baseUrl + '/cards/likes/' + _id, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(this._getResponseData);
    }

    deleteCard(_id) {
        return fetch(this._baseUrl + '/cards/' + _id, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization
            },
        })
            .then(this._getResponseData);
    }



}

