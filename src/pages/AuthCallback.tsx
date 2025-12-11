import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        navigate('/login?error=' + error);
        return;
      }

      if (token) {
        localStorage.setItem('token', token);
        
        // Fetch user data
        const user = await authApi.getCurrentUser();
        if (user) {
          setUser(user);
          navigate('/dashboard');
        } else {
          navigate('/login?error=failed_to_get_user');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-surface-400">Completing sign in...</p>
      </div>
    </div>
  );
}

