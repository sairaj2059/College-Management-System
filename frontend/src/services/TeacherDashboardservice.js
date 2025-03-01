import axios from "axios";

class TeacherDashboardservice {
static BASE_URL = "http://localhost:8080/teacher";

static async addAttendance(attendancedata) {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token); // Added logging for the token
    try {
      const response = await axios.post(
        `${this.BASE_URL}/sendattendence`,
        attendancedata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export default TeacherDashboardservice;