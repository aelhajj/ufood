import { user } from "../user";

export const api = new class Api {

    baseUrl = "https://ufoodapi.herokuapp.com/unsecure"

    getRestaurants() {
        return fetch(`${this.baseUrl}/restaurants/`)
        .then((res) => res.json());
    }

    getRestaurantByID(id) {
        if (!id)
            throw new Error("Missing Param");
        return fetch(`${this.baseUrl}/restaurants/${id}`)
        .then((res) => res.json());
    }

    getFavoritesLists() {
        return fetch(`${this.baseUrl}/favorites`)
        .then((res) => res.json())
        .then((res) => Promise.resolve(res.items))
    }

    addToFavorite(idList, idRestaurant) {
        return fetch(`${this.baseUrl}/favorites/${idList}/restaurants`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idRestaurant
            })
        })
        .then(res => res.json());
    }

    visitRestaurant(form) {
        const idUser = user.getIdUser();
        const auth = user.getAuthToken();
        return fetch(`${this.baseUrl}/users/${idUser}/restaurants/visits`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            },
            body: JSON.stringify(form)
        })
        .then(res => res.json());
    }

}