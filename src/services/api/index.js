import { user } from "../user";

export const api = new (class Api {
  baseUrl = "https://ufoodapi.herokuapp.com/unsecure";

  getRestaurants() {
    return fetch(`${this.baseUrl}/restaurants/`).then((res) => res.json());
  }

  getRestaurantByID(id) {
    if (!id) throw new Error("Missing Param");
    return fetch(`${this.baseUrl}/restaurants/${id}`).then((res) => res.json());
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
})();
