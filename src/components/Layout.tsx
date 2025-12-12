import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiPlus, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('https://qosai.cloud');
  };

  return (
    <div className="min-h-screen bg-surface-950 bg-grid">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                <span className="text-surface-950 font-bold text-lg">Q</span>
              </div>
              <span className="font-display font-bold text-xl text-surface-100">
                QOS
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="btn-ghost flex items-center gap-2"
              >
                <FiHome className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <Link
                to="/create"
                className="btn-ghost flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                <span className="hidden sm:inline">New Course</span>
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-surface-700">
                <div className="flex items-center gap-2">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-surface-600"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-surface-700 flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-surface-400" />
                    </div>
                  )}
                  <span className="text-sm text-surface-300 hidden sm:inline">
                    {user?.name}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="btn-ghost p-2"
                  title="Logout"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {children}
      </motion.main>
    </div>
  );
}

