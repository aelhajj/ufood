export const user = new (class {
  getIdUser() {
    //  return "5fa8b39f1a4e510004217bdd"
    return "5fac0ba5fed821000485521f";
  }

  getEmail() {
    return "john@gmail.com";
  }

  getAuthToken() {
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZmE4YjM5ZjFhNGU1MTAwMDQyMTdiZGQiLCJleHAiOjE2MDQ5NzgwMDM5Njh9.fPlvmrb5rclnxTVFW9iIYUPggGGxscr239TIXbIXiBM";
  }

  setIdUser() {
    throw new Error("Not Implemented");
  }

  setAuthToken() {
    throw new Error("Not Implemented");
  }
})();
