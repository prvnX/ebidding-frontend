import React, { useEffect, useState } from 'react';
import { fetchProtectedResource } from './authApi';
import useAuthStore from '../components/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Hello = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { jwtToken, clearAuthData } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHello = async () => {
      console.log('🔑 Current JWT before request in hello:', jwtToken);
      try {
        const data = await fetchProtectedResource(
          '/auth/hello',
          { message: 'Hello from frontend' },
          'post'
        );
        console.log('✅ Successful hello response:', data);
        setMessage(data);
      } catch (err) {
        console.error(
          '❌ Fetch error:',
          err.response ? err.response.data : err.message,
          'Status:',
          err.response?.status
        );
        setError(err.message);
        if (err.response && err.response.status === 401) {
          clearAuthData(); // ✅ Correct function
          navigate('/login');
        }
      }
    };

    fetchHello();
  }, [jwtToken, clearAuthData, navigate]);

  return (
    <div>
      <h2>Test Authentication</h2>
      {message && <p>Response: {message}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Hello;
