import api from './api';
import { AuthResponse, LoginFormData, RegisterFormData } from '../types';

export const authService = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

export const contentService = {
  getPublic: async (): Promise<{ message: string; access: string }> => {
    const response = await api.get('/public');
    return response.data;
  },

  getUserContent: async (): Promise<{ message: string; access: string }> => {
    const response = await api.get('/user');
    return response.data;
  },

  getAdminContent: async (): Promise<{ message: string; access: string }> => {
    const response = await api.get('/admin');
    return response.data;
  },
};
