import { Navigate, Outlet  } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const {role, isLoggedIn} = useSelector((state) => state.auth);
  
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet/>;
}

export default ProtectedRoute;
