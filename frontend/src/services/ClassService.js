import axios from "axios";

class ClassService {
  static BASE_URL = "http://localhost:8080";
  static async getClasses() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${ClassService.BASE_URL}/getClasses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ClassService;
