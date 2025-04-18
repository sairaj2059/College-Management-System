import axios from "axios";

class CourseService {
  static BASE_URL = "http://localhost:8080/courses";

  static async getCourses() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${this.BASE_URL}/getCourses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getAllSubjects() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${this.BASE_URL}/getAllSubjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getCoursesAndSemesters() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/getCoursesAndSemesters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getCourseDetails(courseName) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/getCourseDetails/${courseName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getSemesterData(courseName, semesterNumber) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/getCourseDetails/${courseName}/${semesterNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default CourseService;
