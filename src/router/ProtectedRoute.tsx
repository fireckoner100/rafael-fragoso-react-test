import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);

  // Si no hay sesión activa, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión, deja acceder al componente hijo
  return <Outlet />;
};

export default ProtectedRoute;
