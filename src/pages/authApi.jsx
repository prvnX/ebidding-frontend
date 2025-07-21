// AuthApi.js
import axios from 'axios';
import useAuthStore from '../components/useAuthStore';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Ensures refreshToken cookie is sent
});

let isRefreshing = false;
let refreshSubscribers = [];

api.interceptors.response.use(
  (response) => {
    console.log('Successful response:', response.status, 'Data:', response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        console.log('Attempting token refresh due to status:', error.response.status, 'Original URL:', originalRequest.url);
        console.log();
        try {
          const refreshResponse = await api.post('/refresh-token');
          console.log('Refresh response:', refreshResponse.data);
          if (refreshResponse.data && refreshResponse.data.jwtToken) {
            console.log('Token refreshed successfully:', refreshResponse.data.jwtToken);
            useAuthStore.getState().setAuthData({
              jwtToken: refreshResponse.data.jwtToken,
              role: refreshResponse.data.role,
              username: refreshResponse.data.username
            });
            refreshSubscribers.forEach(callback => callback(refreshResponse.data.jwtToken));
          } else {
            throw new Error('No JWT in refresh response');
          }
        } catch (err) {
          console.error('Refresh failed:', err.message, 'Response:', err.response?.data);
          useAuthStore.getState().clearJwtToken();
          window.location.href = '/login';
        } finally {
          isRefreshing = false;
          refreshSubscribers = [];
        }
      }
      return new Promise((resolve) => {
        refreshSubscribers.push((newJwtToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newJwtToken}`;
          console.log('Retrying with new token:', newJwtToken);
          resolve(api(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

export const fetchProtectedResource = async (url, data = {}, method) => {
  const { jwtToken } = useAuthStore.getState();
  //console.log("aaaaaaaa");
  //console.log(jwtToken);
  try {
    const response = await api({
      method,
      url,
      data,
      headers: jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {},
    });
    return response;
  } catch (err) {
    console.error('Fetch error:', err.response ? err.response.data : err.message, 'Status:', err.response?.status);
    throw err; // Let the calling component handle the error
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (data.message === 'Login successful' && data.jwtToken) {
      useAuthStore.getState().setAuthData({
        jwtToken: data.jwtToken,
        role: data.role,
        username: credentials.username
      });
      return data;
    }
    throw new Error('Login failed: Invalid credentials');
  } catch (err) {
    console.error('Login error:', err.message);
    throw err;
  }
};

export default api;