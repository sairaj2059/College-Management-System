import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080";

  static async login(username, password) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    try {
      const response = await axios.post(`${UserService.BASE_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(formData) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.status
    } catch (error) {
        console.error(error)
        throw error;
        
    }
  }

  /*Authentication checker */

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    console.log(token);
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isTeacher() {
    const role = localStorage.getItem("role");
    return role === "TEACHER";
  }

  static isStudent() {
    const role = localStorage.getItem("role");
    return role === "STUDENT";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
