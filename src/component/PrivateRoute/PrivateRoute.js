import { Navigate, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const token = secureLocalStorage.getItem("UserData");
  const varify = token?.email || token?.Email;

  return !varify ? <Navigate to="/" state={{ from: location }} /> : children;
};

export default PrivateRoute;
