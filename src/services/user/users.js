import { user } from "../user";

export const users = new (class {
  baseUrl = "https://ufoodapi.herokuapp.com";
  auth = user.getAuthToken();

  getUser(idUser) {
    return fetch(`${this.baseUrl}/users/${idUser}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth,
      },
    }).then((res) => res.json());
  }

  getUsers() {
    return fetch(`${this.baseUrl}/users`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth,
      },
    }).then((res) => res.json());
  }

  getUsersSearch(inputName) {
    return fetch(`${this.baseUrl}/users?q=${inputName}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth,
      },
    }).then((res) => res.json());
  }
})();
