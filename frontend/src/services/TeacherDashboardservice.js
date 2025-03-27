import axios from "axios";

class TeacherDashboardservice {
static BASE_URL = "http://localhost:8080";

static async addAttendance(attendancedata) {
    const token = localStorage.getItem("token");
    console.log("Token being sent:", token); // Added logging for the token
    try {
      const response = await axios.post(
        `${this.BASE_URL}/teacher/sendattendence`,
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

  static async getTeacherProfilebyteacherId( teacherId){
    const token = localStorage.getItem("token");
    console.log("inside the getTeacherProfile before fetch")
    try {
      const response = await axios.get(
        `${this.BASE_URL}/teacher/teacherProfile/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("inside the getTeacherProfile after fetch")
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // static async getResultsBySubjectTeacherAndSubjectName(subjectTeacher, subjectName) {
  //   const token = localStorage.getItem("token");
  //   console.log("Retrieved Token:", token); // Debugging

  //   try {
  //     const response = await axios.get(
  //       `${this.BASE_URL}/teacher/getResults`,
  //       {
  //         params: {
  //           subjectTeacher: subjectTeacher,
  //           subjectName: subjectName,
  //         },
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("Full API Response:", response.data); // Debugging response

  //     if (!response.data || !Array.isArray(response.data)) {
  //       console.error("Unexpected API response format:", response.data);
  //       return []; // Return an empty array to prevent errors
  //     }

  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching results:", error.response?.status, error.response?.data);
  //     return [];
  //   }
  // }
}
export default TeacherDashboardservice;