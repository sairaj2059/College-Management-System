import { Navigate, Outlet } from "react-router-dom";
import UserService from "../services/UserService";
import { NavigationBar } from "../pages/NavigationBar";

function ProtectedRoute({ roleRequired = null }) {
  if (!UserService.isAuthenticated()) {
    return <Navigate to={"/login"}/>;
  }

  if(roleRequired){
    switch(roleRequired){
        case "ADMIN":
            return UserService.isAdmin()? <Outlet/> :<Navigate to={"/"}/>;
        
        case "STUDENT":
            return UserService.isStudent()? <Outlet/> : <Navigate to={"/"}/>;
            
        case "TEACHER":
            return UserService.isTeacher()? <Outlet/> : <Navigate to={"/"}/>;

        default:
            return <Navigate to={"/student"}/>
    }
  }

  return <Outlet/>
}

export default ProtectedRoute;
