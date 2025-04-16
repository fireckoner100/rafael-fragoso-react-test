import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Ocultar navbar en login y not found
    if (location.pathname === '/login' || location.pathname === '/404') return null;


    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark px-3">
            <span className="navbar-brand">{'<Rafafe />'}</span>
            <a href="/" className="nav-link text-white ms-3">Inicio</a>

            <div className="ms-auto d-flex align-items-center gap-3 text-white">
                <span>
                    <i className="bi bi-person-circle me-1"></i>{user}
                </span>
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                    <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
                </button>
            </div>
        </nav>

    );
};

export default Navbar;
