// src/services/user.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getProfile = async () => {
  const { data } = await api.get(API_ENDPOINTS.SETTINGS.PROFILE);
  return data;
};

export const updateProfile = async (profileData: Record<string, any>) => {
  const { data } = await api.put(API_ENDPOINTS.SETTINGS.PROFILE, profileData);
  return data;
};

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  const { data } = await api.put(API_ENDPOINTS.SETTINGS.PASSWORD, {
    currentPassword,
    newPassword,
  });
  return data;
};

export const deleteAccount = async () => {
  const { data } = await api.delete(API_ENDPOINTS.SETTINGS.PROFILE);
  return data;
};