import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const SessionManager = () => {
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Detecta actividad y actualiza el timestamp
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem('auth-last-activity', Date.now().toString());
    };

    const events = ['click', 'keydown', 'mousemove', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, updateActivity));

    return () => {
      events.forEach((e) => window.removeEventListener(e, updateActivity));
    };
  }, []);

  // Revisa si la sesión sigue activa cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      const active = isAuthenticated();
      if (!active) {
        logout();
        window.location.href = '/login';
      }
    }, 60000); // cada 1 minuto

    return () => clearInterval(interval);
  }, [logout, isAuthenticated]);

  return null; // este componente no renderiza nada visual
};

export default SessionManager;
