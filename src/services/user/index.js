import Cookies from 'js-cookie';

export const user = new (class {
  getIdUser() {
    return Cookies.get("userid");
  }

  setIdUser(idUser) {
    Cookies.set('userid', idUser);
  }

  getEmail() {
   return Cookies.get("email");
  }

  setEmail(email) {
    Cookies.set("email", email);
  }

  getAuthToken() {
    return Cookies.get("token");
  }

  setAuthToken(token) {
    Cookies.set("token", token)
  }

  clear() {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("userid");
  }

})();
