import { useState, useEffect } from 'react';
import { login } from './authApi';
import useAuthStore from '../components/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { jwtToken, role, username } = useAuthStore();

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError('Both username and password are required.');
      return false;
    }
    
    const scriptPattern = /<[^>]*script|<\/[^>]*script|<[^>]+>/i;
    if (scriptPattern.test(formData.username) || scriptPattern.test(formData.password)) {
      setError('HTML or script tags are not allowed.');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({ 
      ...prevData, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess('');
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await login({ username: formData.username, password: formData.password });
      setSuccess('Login successful!');
      
      if (data.role === 'Bidder') {
        navigate('/RegisteredUser/dashboard');
      } else if (data.role === 'AuctionManager') {
        navigate('/auction/dashboard');
      } else if (data.role === 'UserManager') {
        navigate('/user-manager/overview');
      } else {
        navigate('/unauthorized');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.maga.lk/wp-content/uploads/2015/04/103-customs-headquarters-10.jpg')`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/40 to-[#2d4a6b]/40"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-sm border border-[#2e4a7f] shadow-2xl rounded-lg">
          <div className="space-y-1 text-center p-6">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#1e3a5f] flex items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#152a4a]">Sri Lanka Customs</h2>
            <p className="text-[#1e3a5f]">Enter your credentials to access your account</p>
          </div>
          <div className="space-y-4 p-6">
            {error && (
              <p className="text-red-600 text-sm text-center" id="error-message">
                {error}
              </p>
            )}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete='off'>
              <div className="space-y-3">
                <label htmlFor="username" className="text-[#152a4a] font-medium text-lg">
                  National Identity Card (NIC)
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="202243589736"
                  autoComplete='off'
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="password" className="text-[#152a4a] font-medium text-lg">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete='off'
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    aria-describedby={error ? 'error-message' : undefined}
                    className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#1e3a5f]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-[#1e3a5f]">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-[#2e4a7f] text-[#1e3a5f] focus:ring-[#1e3a5f]"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-[#1e3a5f] hover:text-[#152a4a] hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1e3a5f] hover:bg-[#152a4a] text-white font-medium py-2.5 rounded-md cursor-pointer disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>
            <p className="text-center text-sm text-[#1e3a5f]">
              Don’t have an account?{' '}
              <a href="/register" className="text-[#1e3a5f] hover:text-[#152a4a] hover:underline font-medium">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;