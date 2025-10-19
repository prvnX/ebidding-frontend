// Analytics API Service
import axios from 'axios';
import useAuthStore from '../components/useAuthStore';

const API_BASE_URL = 'http://localhost:8081/bs/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const { jwtToken } = useAuthStore.getState();
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const analyticsService = {
  /**
   * Fetch monthly analytics data
   * @param {number} month - Month number (1-12), 0 for current month
   * @param {number} year - Year (e.g., 2025)
   * @returns {Promise} Analytics data from backend
   */
  getMonthlyAnalytics: async (month = 0, year = new Date().getFullYear()) => {
    try {
      const response = await apiClient.get('/analytics', {
        params: { month, year }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};

export default analyticsService;

