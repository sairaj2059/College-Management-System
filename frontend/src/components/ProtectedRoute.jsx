import { Navigate, Outlet  } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const {role, isLoggedIn} = useSelector((state) => state.auth);
  
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;//add unauthorised
  return <Outlet/>;
}

export default ProtectedRoute;
