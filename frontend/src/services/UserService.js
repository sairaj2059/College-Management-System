import axios from "axios";

class UserService{
    static BASE_URL = "http://10.130.234.23:8080";

    static async login(username, password){
        try {
            const response = await axios.post(`${UserService.BASE_URL}/login`, {username, password})
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }


/*Authentication checker */

    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token;
    }

    static isAdmin(){
        const role  = localStorage.getItem('role')
        return role === "ADMIN";
    }

    static isTeacher(){
        const role = localStorage.getItem('role')
        return role ==="TEACHER";
    }

    static isStudent(){
        const role = localStorage.getItem('role')
        return role === "STUDENT";
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserService