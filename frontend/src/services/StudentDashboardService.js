import axios from "axios";

class StudentDashboardService {
  static BASE_URL = "http://localhost:8080/student";

  static async getStudentAttendence(className, regdNo, month) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/get_Sattendance/${className}`,
        {
          params: { regdNo, month },
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
  static async getStudentProfilebyregdNo( regdNo){
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/studentProfile/${regdNo}`,
        {
          params: { regdNo},
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
  static async getSubresultbyregdNo( regdNo){
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/semResults/${regdNo}`,
        {
          params: { regdNo},
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
  static async getSemesterData(courseName,semesterNumber) {     
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/getSemesterData/${courseName}${semesterNumber}`,
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

export default StudentDashboardService;