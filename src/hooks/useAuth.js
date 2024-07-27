import { useContext } from "react";
import { AuthContext } from "../../Components/Contexts/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
