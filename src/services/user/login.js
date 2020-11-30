export const loginApi = new (class {
  baseUrl = "https://ufoodapi.herokuapp.com";

  registerUser(email, password) {
    const data =
      "&email=" +
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
      .then((response) => {
        if (response.status !== 401)
         return 1;
        else return -1;
      })
      .catch((error) => {
        console.log(error);
      });
  }
})();
