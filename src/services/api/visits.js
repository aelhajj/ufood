import { user } from "../user";

export const visitApi = new (class {
  baseUrl = "https://ufoodapi.herokuapp.com";
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
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status !== 401) return 1;
        else return -1;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRestaurantVisit(idRestaurant) {
    const idUser = user.getIdUser();
    const auth = user.getAuthToken();
    return fetch(
      `${this.baseUrl}/users/${idUser}/restaurants/${idRestaurant}/visits`,
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
})();
