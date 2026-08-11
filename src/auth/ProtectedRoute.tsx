import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { environment } from "../config/environment";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (environment.dataSource !== "fixture" && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
