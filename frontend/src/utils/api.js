 class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

     _checkResponse(res) {
         return res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`);
     }

    // Получение постов с сервера
    getInitialCards() {
       return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        }).then(this._checkResponse);
    }

    // Получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(this._checkResponse);
    }

    // Изменение данных о пользователе
    editUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method : 'PATCH',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._checkResponse);
    }

    // Изменение аватара пользователя
    changeAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method : 'PATCH',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                avatar : link
            })
        }).then(this._checkResponse);
    }

    // Добавление поста
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method : 'POST',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                name : data.name,
                link : data.link
            })
        }).then(this._checkResponse);
    }

    // Удаление поста
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(this._checkResponse);
    }

    // Добавление лайка к посту
    addLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            }
        }).then(this._checkResponse);
    }

    // Отмена лайка к посту
    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers : {
                authorization : this._token
            }
        }).then(this._checkResponse);
    }

     changeLikeCardStatus(cardId, isLiked) {
         if (isLiked) {
             return this.removeLike(cardId)
         } else {
             return this.addLike(cardId)
         }
     }
}

const api = new Api({
     baseUrl : 'https://mesto.nomoreparties.co/v1/cohort-22',
     token : '312a0732-cbcd-4979-9e85-1354911a9934'
 });

 export default api;
