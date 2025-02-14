import axios from "axios";

class DiscussionService {
  static BASE_URL = "http://localhost:8080";

  static async getMessages(groupId) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${DiscussionService.BASE_URL}/discussion/${groupId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

        }
      );
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }
}
export default DiscussionService;
