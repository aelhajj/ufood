import { user } from "../user";
export const followApi = new (class {
  baseUrl = "https://ufoodapi.herokuapp.com";

  followUser(userId) {
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/follow`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        id: userId,
      }),
    }).then((res) => res.json());
  }

  unfollowUser(userId) {
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/follow/${userId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    }).then((res) => res.json());
  }

  getFollowers() {
    const idUser = user.getIdUser();
    const auth = user.getAuthToken();
    return fetch(`${this.baseUrl}/users/${idUser}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    }).then((res) => res.json());
  }
})();
