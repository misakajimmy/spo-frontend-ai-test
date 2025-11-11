import { apiClient } from './api';

export interface Platform {
  id: string;
  name: string;
  enabled: boolean;
}

export const getPlatforms = async (): Promise<Platform[]> => {
  const res = await apiClient.get('/api/platforms');
  return res.data as Platform[];
};

export const getEnabledPlatforms = async (): Promise<Platform[]> => {
  const res = await apiClient.get('/api/platforms/enabled');
  return res.data as Platform[];
};

export const updatePlatform = async (id: string, data: Partial<Platform>): Promise<void> => {
  await apiClient.put(`/api/platforms/${id}`, data);
};

export const deletePlatform = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/platforms/${id}`);
};
