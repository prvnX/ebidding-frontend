// Analytics API Service
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/bs/v1';

export const analyticsService = {
  /**
   * Fetch monthly analytics data
   * @param {number} month - Month number (1-12), 0 for current month
   * @param {number} year - Year (e.g., 2025)
   * @returns {Promise} Analytics data from backend
   */
  getMonthlyAnalytics: async (month = 0, year = new Date().getFullYear()) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/analytics`, {
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

