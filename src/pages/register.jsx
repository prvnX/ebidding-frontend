import { useState } from 'react';
import { fetchProtectedResource } from './authApi';
//import { register } from './authApi'; // Assuming a register function exists
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    primary_phone: '',
    secondary_phone: '',
    date_of_birth: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const requiredFields = ['username', 'password', 'email', 'first_name', 'last_name', 'date_of_birth', 'primary_phone', 'secondary_phone'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.replace('_', ' ').toUpperCase()} is required.`);
        return false;
      }
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      const data = await fetchProtectedResource('http://localhost:8080/register', formData , 'POST');
      console.log('Successful hello response:', data);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.maga.lk/wp-content/uploads/2015/04/103-customs-headquarters-10.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-[#1e3a5f]/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4 mt-10 mb-10">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#152a4a]">Sri Lanka Customs</h2>
            <p className="text-[#1e3a5f]">Create your account</p>
          </div>
          <div className="space-y-4 p-6">
            {error && (
              <p className="text-red-600 text-sm text-center" id="error-message">
                {error}
              </p>
            )}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-[#152a4a] font-medium">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:borderincidence response team
                  focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[#152a4a] font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="bob@gmail.com"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-[#152a4a] font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-[#152a4a] font-medium">
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last_name" className="text-[#152a4a] font-medium">
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="primary_phone" className="text-[#152a4a] font-medium">
                  Primary Phone
                </label>
                <input
                  id="primary_phone"
                  type="tel"
                  name="primary_phone"
                  value={formData.primary_phone}
                  onChange={handleChange}
                  placeholder="+94 123 456 789"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="secondary_phone" className="text-[#152a4a] font-medium">
                  Secondary Phone
                </label>
                <input
                  id="secondary_phone"
                  type="tel"
                  name="secondary_phone"
                  value={formData.secondary_phone}
                  onChange={handleChange}
                  placeholder="+94 123 456 789"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date_of_birth" className="text-[#152a4a] font-medium">
                  Date of Birth
                </label>
                <input
                  id="date_of_birth"
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  aria-describedby={error ? 'error-message' : undefined}
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1e3a5f] hover:bg-[#152a4a] text-white font-medium py-2.5 rounded-md cursor-pointer disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p className="text-center text-sm text-[#1e3a5f]">
              Already have an account?{' '}
              <a href="/login" className="text-[#1e3a5f] hover:text-[#152a4a] hover:underline font-medium">
                Sign In
              </a>
            </p>
            <div className="text-center text-sm text-[#1e3a5f]">
              Need help?{' '}
              <a href="#" className="text-[#1e3a5f] hover:text-[#152a4a] hover:underline font-medium">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;