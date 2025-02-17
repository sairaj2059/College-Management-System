import { Navigate, Outlet } from "react-router-dom";
import UserService from "../services/UserService";

function ProtectedRoute({ roleRequired = null }) {
  if (!UserService.isAuthenticated()) {
    return <Navigate to={"/login"}/>;
  }

  if(roleRequired){
    switch(roleRequired){
        case "ROLE_ADMIN":
            return UserService.isAdmin()? <Outlet/> :<Navigate to={"/"}/>;
        
        case "ROLE_STUDENT":
            return UserService.isStudent()? <Outlet/> : <Navigate to={"/"}/>;
            
        case "ROLE_TEACHER":
            return UserService.isTeacher()? <Outlet/> : <Navigate to={"/"}/>;

        default:
            return <Navigate to={"/student"}/>
    }
  }

  return <Outlet/>
}

export default ProtectedRoute;
