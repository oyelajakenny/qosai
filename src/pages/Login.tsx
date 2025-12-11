import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';

const errorMessages: Record<string, string> = {
  auth_failed: 'Authentication failed. Please try again.',
  no_user: 'Could not retrieve user information.',
  google_not_configured: 'Google login is not configured. Please contact the administrator.',
  github_not_configured: 'GitHub login is not configured. Please contact the administrator.',
};

export default function Login() {
  const { user, login } = useAuth();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-surface-950 bg-grid flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="fixed top-1/4 left-1/3 w-96 h-96 bg-accent-500/10 rounded-full blur-[128px]" />
      <div className="fixed bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/30">
            <span className="text-surface-950 font-bold text-2xl">Q</span>
          </div>
          <span className="font-display font-bold text-3xl text-surface-100">
            QOS
          </span>
        </Link>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
          >
            <FiAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">
              {errorMessages[error] || 'An error occurred. Please try again.'}
            </p>
          </motion.div>
        )}

        {/* Login Card */}
        <div className="glass-card">
          <h1 className="font-display font-bold text-2xl text-surface-100 text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-surface-400 text-center mb-8">
            Sign in to access your courses and create new ones
          </p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => login('google')}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg"
            >
              <FcGoogle className="w-6 h-6" />
              Continue with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => login('github')}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-surface-800 text-surface-100 font-medium rounded-xl border border-surface-700 hover:bg-surface-700 hover:border-surface-600 transition-all duration-200"
            >
              <FiGithub className="w-6 h-6" />
              Continue with GitHub
            </motion.button>
          </div>

          <p className="text-surface-500 text-sm text-center mt-8">
            By signing in, you agree to our terms of service and privacy policy
          </p>
        </div>

        <p className="text-center text-surface-500 mt-6">
          Don't have an account?{' '}
          <button onClick={() => login('google')} className="text-accent-400 hover:text-accent-300">
            Sign up for free
          </button>
        </p>
      </motion.div>
    </div>
  );
}
