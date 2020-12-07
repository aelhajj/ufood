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
    }).then((res) => console.log(res.json()));
  }
})();
