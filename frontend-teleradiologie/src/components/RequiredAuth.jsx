import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { APP_ROUTES } from "../utils/url";

export default function RequireAuth() {
  const location = useLocation();
  const { auth } = useAuth();
  return auth !== undefined && auth !== null ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />
  );
}
