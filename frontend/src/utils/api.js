 class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

     _checkResponse(res) {
         return res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`);
     }

    // Получение постов с сервера
    getInitialCards() {
       return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Изменение данных о пользователе
    editUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method : 'PATCH',
            headers: this._headers,
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
            headers: this._headers,
            body : JSON.stringify({
                avatar : link
            })
        }).then(this._checkResponse);
    }

    // Добавление поста
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method : 'POST',
            headers: this._headers,
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
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Добавление лайка к посту
    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    // Отмена лайка к посту
    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
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
     baseUrl : 'https://yar.mesto.api.nomoredomains.rocks',
        headers: {
        'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
 });

 export default api;
