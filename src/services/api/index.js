import { user } from "../user";

export const api = new (class Api {
  baseUrl = "https://ufoodapi.herokuapp.com/unsecure";

  getRestaurants() {
    return fetch(`${this.baseUrl}/restaurants/`).then((res) => res.json());
  }

  getRestaurantByID(id) {
    if (!id) throw new Error("Missing Param");
    return fetch(`${this.baseUrl}/restaurants/${id}`)
    .then((res) => res.json());
  }

  getFavoritesLists() {
    return fetch(`${this.baseUrl}/favorites`)
      .then((res) => res.json())
      .then((res) => Promise.resolve(res.items));
  }

  addToFavorite(idList, idRestaurant) {
    return fetch(`${this.baseUrl}/favorites/${idList}/restaurants`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idRestaurant,
      }),
    }).then((res) => res.json());
  }

  visitRestaurant(form) {
    const idUser = user.getIdUser();
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/users/${idUser}/restaurants/visits`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(form),
    }).then((res) => res.json());
  }

  getRestaurantVisit(idRestaurant) {
    const idUser = user.getIdUser();
    const auth = user.getAuthToken();
    return fetch(
      `${this.baseUrl}/users/${idUser}/restaurants/${idRestaurant}/visits?limit=3`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => Promise.resolve(res.items));
  }

  getUser() {
    const idUser = user.getIdUser();
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/users/${idUser}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    })
      .then((res) => res.json())
      .then((res) => Promise.resolve(res));
  }

  getUserFavorites() {
    const idUser = user.getIdUser();
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/users/${idUser}/favorites`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    })
      .then((res) => res.json())
      .then((res) => Promise.resolve(res.items));
  }

  getUserVisited() {
    const idUser = user.getIdUser();
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/users/${idUser}/restaurants/visits`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    })
      .then((res) => res.json())
      .then((res) => Promise.resolve(res.items));
  }

  addUserFavorite(name) {
    const auth = user.getAuthToken();
    const email = user.getEmail();
    return fetch(`${this.baseUrl}/favorites`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        name: name,
        owner: email,
      }),
    }).then((res) => res.json());
  }

  editUserFavorite(idList, name) {
    const auth = user.getAuthToken();
    const email = user.getEmail();
    return fetch(`${this.baseUrl}/favorites/${idList}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        name: name,
        owner: email,
      }),
    }).then((res) => res.json());
  }

  deleteUserFavorite(idList) {
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/favorites/${idList}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    }).then((res) => res.json());
  }

})();

