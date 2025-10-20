// User Service - API calls for user management
import axios from 'axios';
import useAuthStore from '../components/useAuthStore';

// User Service runs on port 8083
const BASE_URL = 'http://localhost:8083/us/v1';

// Create axios instance for user service
const userServiceApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add request interceptor to include JWT token
userServiceApi.interceptors.request.use(
  (config) => {
    console.log(`[User Service] Making request to: ${config.baseURL}${config.url}`);
    const { jwtToken } = useAuthStore.getState();
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
      console.log('[User Service] JWT token added to request');
    } else {
      console.warn('[User Service] No JWT token found');
    }
    return config;
  },
  (error) => {
    console.error('[User Service] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
userServiceApi.interceptors.response.use(
  (response) => {
    console.log(`[User Service] Response received:`, response.status, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('[User Service] Server error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('[User Service] No response from server:', {
        url: error.config?.url,
        message: 'Check if User Service is running on port 8083'
      });
    } else {
      // Error setting up request
      console.error('[User Service] Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const response = await userServiceApi.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  try {
    const response = await userServiceApi.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

/**
 * Get users by role
 */
export const getUsersByRole = async (role) => {
  try {
    const response = await userServiceApi.get(`/users/role/${role}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching users with role ${role}:`, error);
    throw error;
  }
};

/**
 * Get all bidders
 */
export const getAllBidders = async () => {
  try {
    const response = await userServiceApi.get('/bidders');
    return response.data;
  } catch (error) {
    console.error('Error fetching bidders:', error);
    throw error;
  }
};

/**
 * Get bidder by ID
 */
export const getBidderById = async (bidderId) => {
  try {
    const response = await userServiceApi.get(`/bidders/${bidderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bidder ${bidderId}:`, error);
    throw error;
  }
};

/**
 * Get all auction managers
 */
export const getAllAuctionManagers = async () => {
  try {
    const response = await userServiceApi.get('/auction-managers');
    return response.data;
  } catch (error) {
    console.error('Error fetching auction managers:', error);
    throw error;
  }
};

/**
 * Get auction manager by ID
 */
export const getAuctionManagerById = async (auctionManagerId) => {
  try {
    const response = await userServiceApi.get(`/auction-managers/${auctionManagerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching auction manager ${auctionManagerId}:`, error);
    throw error;
  }
};

/**
 * Get all yard managers
 */
export const getAllYardManagers = async () => {
  try {
    const response = await userServiceApi.get('/yard-managers');
    return response.data;
  } catch (error) {
    console.error('Error fetching yard managers:', error);
    throw error;
  }
};

/**
 * Get yard manager by ID
 */
export const getYardManagerById = async (yardManagerId) => {
  try {
    const response = await userServiceApi.get(`/yard-managers/${yardManagerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching yard manager ${yardManagerId}:`, error);
    throw error;
  }
};

/**
 * Get self details (current logged-in user)
 */
export const getSelfDetails = async () => {
  try {
    const response = await userServiceApi.get('/getSelfDetails');
    return response.data;
  } catch (error) {
    console.error('Error fetching self details:', error);
    throw error;
  }
};
