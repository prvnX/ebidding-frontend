import axios from 'axios';
import useAuthStore from '../components/useAuthStore';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true, // ensures refreshToken cookie is sent
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newJwtToken) => {
  refreshSubscribers.forEach((callback) => callback(newJwtToken));
  refreshSubscribers = [];
};

const refreshTokenRequest = async () => {
  const refreshResponse = await api.post('/auth/refresh-token');
  if (refreshResponse.data && refreshResponse.data.jwtToken) {
    const { jwtToken, role, username } = refreshResponse.data;
    useAuthStore.getState().setAuthData({ jwtToken, role, username });
    return jwtToken;
  }
  throw new Error('Refresh failed: no jwtToken in response');
};

// 🔄 Interceptor for handling expired JWT
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newJwtToken = await refreshTokenRequest();
          onRefreshed(newJwtToken);
        } catch (err) {
          console.error('Refresh failed:', err.message);
          useAuthStore.getState().clearJwtToken();
          window.location.href = '/login';
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((newJwtToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newJwtToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

// 🟡 Lazy refresh if JWT missing
export const fetchProtectedResource = async (url, data = {}, method = 'get') => {
  let { jwtToken } = useAuthStore.getState();
  console.log("jwt token in fetch" + jwtToken);
  // 🔄 Try to refresh JWT if missing
  if (!jwtToken) {
    try {
      jwtToken = await refreshTokenRequest();
    } catch (err) {
      console.error('Lazy refresh failed:', err.message);
      window.location.href = '/login';
      throw err;
    }
  }

  try {
    const response = await api({
      method,
      url,
      data,
      headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
    });

    return response.data; // ✅ Return only data
  } catch (error) {
    // If token expired or invalid, clear auth and redirect
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().clearAuthData();
      window.location.href = '/login';
    }
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials, {
      withCredentials: true, // ensures refresh token cookie is sent
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;

    if (data.message === 'Login successful' && data.jwtToken) {
      useAuthStore.getState().setAuthData({
        jwtToken: data.jwtToken,
        role: data.role,
        username: credentials.username,
      });

      return data;
    } else {
      throw new Error('Login failed: Invalid credentials');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Login failed: ${error.response.status} ${error.response.statusText}`
      );
    } else {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
};


export default api;
