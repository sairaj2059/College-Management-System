import axios from "axios";

class StudentDashboardService {
  static BASE_URL = "http://localhost:8080";

  static async getStudentAttendence(className, regdNo, month) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/student/get_Sattendance/${className}`,
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
        `${this.BASE_URL}/student/studentProfile/${regdNo}`,
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
        `${this.BASE_URL}/student/semResults/${regdNo}`,
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
  static async getSemesterData(courseName, semesterNumber) {     
    let token = localStorage.getItem("token");
    if (!token || !token.startsWith("Bearer ")) {
      token = `Bearer ${token}`;
    }
  
    try {
      const response = await axios.get(
        `${this.BASE_URL}/courses/getSemesterData/${courseName}/${semesterNumber}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching semester data:", error.response || error);
      return null;
    }
  }
  

}

export default StudentDashboardService;