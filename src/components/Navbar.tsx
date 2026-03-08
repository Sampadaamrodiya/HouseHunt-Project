import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, LogOut, User, LayoutDashboard, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-3xl px-6 py-3 flex justify-between items-center shadow-lg shadow-black/5">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-600 p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">House<span className="text-brand-600">Hunt</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/properties" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">Explore</Link>
            {user && (
              <Link to={`/${user.role}/dashboard`} className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">Dashboard</Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 pl-2 pr-4 py-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <User className="w-3 h-3 text-brand-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-brand-600 px-4 py-2 transition-colors">Login</Link>
                <Link to="/register" className="text-sm font-bold bg-slate-900 text-white px-6 py-2.5 rounded-2xl hover:bg-brand-600 transition-all shadow-xl shadow-slate-200">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

