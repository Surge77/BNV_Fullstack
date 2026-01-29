import axios from 'axios';
import type { User, UserFormData, PaginatedResponse, ApiResponse } from '@/types/user';

// Configure base URL - update this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('[API Error]', message);
    return Promise.reject(error);
  }
);

export const userService = {
  // Get all users with pagination
  async getUsers(page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> {
    const response = await api.get<PaginatedResponse<User>>(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get single user by ID
  async getUserById(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data!;
  },

  // Create new user
  async createUser(userData: UserFormData): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/users', userData);
    return response.data.data!;
  },

  // Update user
  async updateUser(id: string, userData: UserFormData): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, userData);
    return response.data.data!;
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  // Search users
  async searchUsers(query: string): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>(`/users/search?query=${encodeURIComponent(query)}`);
    return response.data.data!;
  },

  // Export users to CSV
  async exportToCsv(): Promise<Blob> {
    const response = await api.get('/users/export', {
      responseType: 'blob',
    });
    return response.data;
  },
};
