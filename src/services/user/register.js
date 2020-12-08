export const registerApi = new (class {
  baseUrl = "https://ufoodapi.herokuapp.com";

  registerUser(name, email, password) {
    const data =
      "name=" +
      encodeURIComponent(name) +
      "&email=" +
      encodeURIComponent(email) +
      "&password=" +
      encodeURIComponent(password);

    return fetch(`${this.baseUrl}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => {
        if (response.status !== 401) return 1;
        else return -1;
      })
      .catch((error) => {
        console.log(error);
      });
  }
})();
