import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    primary_phone: '',
    secondary_phone: '',
    date_of_birth: '',
    user_image_url: '',
    nic_image_url: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const nicFileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [nicImage, setNicImage] = useState(null);

  const captureImage = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setCapturedImage(screenshot);
      const filename = `${formData.username}_userImage.jpg`;
      setFormData((prevData) => ({ ...prevData, user_image_url: filename }));
    }
  };

  const handleNicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNicImage(reader.result);
        const filename = `${formData.username}_nicImage.jpg`;
        setFormData((prevData) => ({ ...prevData, nic_image_url: filename }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'username',
      'password',
      'email',
      'first_name',
      'last_name',
      'date_of_birth',
      'primary_phone',
      'secondary_phone',
      'user_image_url',
      'nic_image_url',
    ];
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

  const nicRegex = /^(?:\d{9}[vVxX]|\d{12})$/;
  if (!nicRegex.test(formData.username)) {
    setError('Username must be a valid Sri Lankan NIC (e.g., 123456789V or 200012345678).');
    return false;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(formData.primary_phone)) {
    setError('Primary phone number must be 10 digits.');
    return false;
  }
  if (!phoneRegex.test(formData.secondary_phone)) {
    setError('Secondary phone number must be 10 digits.');
    return false;
  }

    // Age validation: user must be at least 18 years old
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      if (Number.isNaN(dob.getTime())) {
        setError('Please enter a valid date of birth.');
        return false;
      }
      const today = new Date();
      // Calculate age in years
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age -= 1;
      }
      if (age < 18) {
        setError('You must be at least 18 years old to register.');
        return false;
      }
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

    const formDataToSend = new FormData();

    // Handle captured user image (webcam)
    if (capturedImage) {
      const byteString = atob(capturedImage.split(',')[1]);
      const mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: mimeString });
      formDataToSend.append('user_image', blob, formData.user_image_url);
    }

    // Handle NIC image
    if (nicImage) {
      const byteString = atob(nicImage.split(',')[1]);
      const mimeString = nicImage.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: mimeString });
      formDataToSend.append('nic_image', blob, formData.nic_image_url);
    }

    // Append other form data
    for (const key in formData) {
      if (key !== 'user_image_url' && key !== 'nic_image_url') {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      console.log(formDataToSend);
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        // Try to parse JSON error, otherwise fall back to text
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (parseErr) {
          const text = await response.text().catch(() => '');
          errorData.message = text;
        }

        const serverMessage = (errorData && errorData.message) || '';
        // Detect duplicate NIC / username unique constraint errors and show a short friendly message
        if (/duplicate key|users_username_key|already exists|duplicate/i.test(serverMessage)) {
          // Short English message for duplicate NIC
          setError('This NIC is already registered. Please use a different NIC number or sign in.');
          setIsLoading(false);
          return;
        }

        throw new Error(serverMessage || 'Registration failed');
      }

      const data = await response.json();
      console.log('Successful registration response:', data);
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
                National Identity Card (NIC)
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
                  className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
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
                  placeholder="kasun@gmail.com"
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
                  placeholder="0725546358"
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
                  placeholder="0704502687"
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
              <div className="space-y-2">
                <label className="text-[#152a4a] font-medium">Capture Photo</label>
                {!capturedImage ? (
                  <div>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "user" }}
                      className="rounded-md"
                    />
                    <button
                      type="button"
                      onClick={captureImage}
                      className="mt-2 bg-[#1e3a5f] hover:bg-[#152a4a] text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Capture Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <img src={capturedImage} alt="Captured" className="rounded-md" />
                    <button
                      type="button"
                      onClick={() => {
                        setCapturedImage(null);
                        setFormData((prev) => ({ ...prev, user_image_url: '' }));
                      }}
                      className="mt-2 bg-[#152a4a] hover:bg-[#1e3a5f] text-white font-medium py-2 px-4 rounded-md"
                    >
                      Retake
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="nic_image" className="text-[#152a4a] font-medium">
                  Upload NIC Front Side
                </label>
                {!nicImage ? (
                  <input
                    id="nic_image"
                    type="file"
                    accept="image/*"
                    ref={nicFileInputRef}
                    onChange={handleNicUpload}
                    disabled={isLoading}
                    className="w-full border border-[#2e4a7f] focus:border-[#1e3a5f] focus:ring focus:ring-[#1e3a5f] focus:ring-opacity-50 rounded-md p-2"
                  />
                ) : (
                  <div>
                    <img src={nicImage} alt="NIC Preview" className="rounded-md w-[300px]" />
                    <button
                      type="button"
                      onClick={() => {
                        setNicImage(null);
                        setFormData((prev) => ({ ...prev, nic_image_url: '' }));
                        if (nicFileInputRef.current) {
                          nicFileInputRef.current.value = null;
                        }
                      }}
                      className="mt-2 bg-[#152a4a] hover:bg-[#1e3a5f] text-white font-medium py-2 px-4 rounded-md"
                    >
                      Re-upload NIC
                    </button>
                  </div>
                )}
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