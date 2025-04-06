import axios from "axios";

class DiscussionService {
  static BASE_URL = "http://localhost:8080";

  static async getParticipants(groupId) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/getParticipants/${groupId}`,
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

  static async getAttachment(attachmentFileId){
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${this.BASE_URL}/api/messages/attachment/${attachmentFileId}`,
          {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data; // blob
      } catch (error) {
        console.error("Error fetching attachment:", error);
        return null;
      }
  }

  static async joinGroupByGroupId(groupId, regdNo) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${this.BASE_URL}/joinGroupByGroupId`, {
        params: {
          groupId: groupId,
          regdNo: regdNo,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  static async getGroupListByTeacher(teacherId) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.BASE_URL}/teacher/getCreatedRooms`,
        {
          params: {
            teacherId: teacherId,
          },
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
  static async getGroupListByStudent(regdNo) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${this.BASE_URL}/getJoinedRooms`, {
        params: {
          regdNo: regdNo,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createRoom(createRoom) {
    console.log(createRoom);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${DiscussionService.BASE_URL}/teacher/createRoom`,
        createRoom,
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
  static async getMessagesByTeacher(groupId, teacherId) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${DiscussionService.BASE_URL}/teacher/getMessages/${groupId}`,
        {
          params: { teacherId: teacherId },

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
  static async getMessagesByStudent(groupId, regdNo) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${DiscussionService.BASE_URL}/getMessages/${groupId}`,
        {
          params: { regdNo: regdNo },

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
}
export default DiscussionService;
