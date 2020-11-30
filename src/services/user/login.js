export const login = new (class {
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
})();
