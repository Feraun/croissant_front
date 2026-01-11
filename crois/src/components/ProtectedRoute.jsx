import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spin } from "antd";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user } = useAuth();

  // пока user не инициализирован — показываем спиннер
  if (user === null) return <Spin size="large" />;


  //роли пользователя
  const roles = Array.isArray(user.roles) ? user.roles : [];

  //роли, которым разрешен доступ с children'у
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [];

  const hasAccess = roles.some(role => allowed.includes(role));

  return hasAccess ? children : <Navigate to="/login" replace />;

}
