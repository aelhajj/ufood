export const user = new (class {
  getIdUser() {
    return localStorage.getItem("userid");
  }

  getEmail() {
   return localStorage.getItem("email");
  }

  getAuthToken() {
    return localStorage.getItem("token");
  }

})();
