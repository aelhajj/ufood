
export const loginApi = new (class {
  baseUrl = "https://ufoodapi.herokuapp.com";

  logUser(email, password) {
    const data =
      "email=" +
      encodeURIComponent(email) +
      "&password=" +
      encodeURIComponent(password);

    return fetch(`${this.baseUrl}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userid", response.id);
        localStorage.setItem("email", response.email);
        if (response.status !== 401) return 1;
        else return -1;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logoutUser() {
    return fetch(`${this.baseUrl}/logout`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(localStorage.clear());
  }
})();
