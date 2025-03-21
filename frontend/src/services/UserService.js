import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080";

  static async login(username, password) {
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

  static async addTeacher(formData){
    const token = localStorage.getItem("token");

      try {
        const response = await axios.post(`${UserService.BASE_URL}/admin/addTeacher`, formData,{
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
      return response.data;
      } catch (error) {
        console.log(error);
      }
  }

  static async addStudent(formData) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${UserService.BASE_URL}/admin/addStudent`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
         "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
        console.log(error);
    }
  }

  static async getStudentsDetails(){
    const token = localStorage.getItem("token");

    const response = await axios.get(`${this.BASE_URL}/admin/getStudentsDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
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
