import axios from "axios";


class ExamService {
  static BASE_URL = "http://localhost:8080";

  static async getQuestionsByTeacher(teacherId){
    const token = localStorage.getItem("token");
    try{
      const response = await axios.get(`${this.BASE_URL}/teacher/getQuestionsByTeacher`, {
        params: {teacherId: teacherId },
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return response.data;
    }catch(e){
      console.log(e);
    }
  }

  static async setQuestionsByTeacher(questions){
    const token = localStorage.getItem("token");
    try{
      const response = await axios.post(`${this.BASE_URL}/teacher/setQuestionsByTeacher`, questions, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      return response.data
    }catch(e){
      console.log(e);
      
    }
  }

  static async addExam(exam) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${this.BASE_URL}/teacher/addExam`,
        exam,
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
    }
  }
  static async getExamListByTeacher(teacherId) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/teacher/getExamList/${teacherId}`,
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
    }
  }

  static async deleteExam(examId){
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(`${this.BASE_URL}/teacher/deleteExam/${examId}`, {
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
    } catch (error) {
      console.log(error);
      
    }
  }
}
export default ExamService;
