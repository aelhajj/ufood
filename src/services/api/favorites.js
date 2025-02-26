import { user } from "../user";

export const favoriteApi = new (class {
  baseUrl = "https://ufoodapi.herokuapp.com";

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

  removeFromFavorite(idList, idRestaurant) {
    const auth = user.getAuthToken();
    return fetch(
      `${this.baseUrl}/favorites/${idList}/restaurants/${idRestaurant}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    ).then((res) => res.json());
  }
})();
