import { Navigate, Outlet  } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const {role, isLoggedIn} = useSelector((state) => state.auth);
  
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;//add unauthorised
  
  return <Outlet/>;
}

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
