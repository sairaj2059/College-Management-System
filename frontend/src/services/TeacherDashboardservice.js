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
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getClassSchedule(className) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/teacher/classShedule/${className}`,
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

  // 2️⃣ Add or update class schedule
  static async addClassSchedule(scheduleData) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${this.BASE_URL}/teacher/addSchedule`,
        scheduleData,
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

  // 3️⃣ Delete class schedule
  static async deleteClassSchedule(className) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${this.BASE_URL}/teacher/deleteSchedule/${className}`,
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