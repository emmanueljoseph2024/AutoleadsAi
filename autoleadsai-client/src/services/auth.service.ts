// src/services/auth.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  return data;
};

export const signupUser = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.SIGNUP, formData);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get(API_ENDPOINTS.AUTH.ME);
  return data;
};

export const refreshAccessToken = async () => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.REFRESH);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  return data;
};

export const forgotPassword = async (email: string) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  return data;
};

export const resetPassword = async (token: string, password: string) => {
  const { data } = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
  return data;
};