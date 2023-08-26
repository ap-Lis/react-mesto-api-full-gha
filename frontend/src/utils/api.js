class Api {
    constructor({url, token}) {
      this._url = url;
      this._token = token;
    }

    _getOkOrNot(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => 
            this._getOkOrNot(res)
        );
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => this._getOkOrNot(res));
    }

    setUserInfo(info) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: info.name, 
                about: info.about
            }) 
        })
        .then((res) => this._getOkOrNot(res));
    }

    addCard(info) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: info.name,
                link: info.link
            })
        })
        .then((res) => this._getOkOrNot(res));
    }

    deleteCard(card) {
        return fetch(`${this._url}cards/${card}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => this._getOkOrNot(res));
    }

    setLike(card) {
        return fetch(`${this._url}cards/${card}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => this._getOkOrNot(res));
    }

    removeLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => this._getOkOrNot(res));
    }

    updateAvatar(avatarUrl) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl
            })
        })
        .then((res) => this._getOkOrNot(res));
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked) {
            return (this.setLike(id));
        } else {
            return (this.removeLike(id));
        }
    }
}

const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-66/', token: '098239d2-f16f-4551-948e-985979822f3b'});

export default api;