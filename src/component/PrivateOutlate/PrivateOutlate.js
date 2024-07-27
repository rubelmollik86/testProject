import useAuth from "./../../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateOutlate() {
  const privateAuth = useAuth();
  return privateAuth ? <Outlet /> : <Navigate to="/login" />;
}
