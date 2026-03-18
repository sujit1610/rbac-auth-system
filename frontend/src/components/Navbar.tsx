import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContext';

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide text-indigo-400">
        🔐 RBAC System
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-300">
              Hello, <span className="font-semibold text-white">{user?.name}</span>
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              user?.role === 'ADMIN'
                ? 'bg-red-500 text-white'
                : 'bg-indigo-500 text-white'
            }`}>
              {user?.role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm hover:text-indigo-400 transition">Login</Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-sm px-4 py-1.5 rounded-lg transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
