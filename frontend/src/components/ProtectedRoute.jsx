import { Navigate,  } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {role, isLoggedIn} = useSelector((state) => state.auth);
  
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/login" />;
  return children;
}


export default ProtectedRoute;
