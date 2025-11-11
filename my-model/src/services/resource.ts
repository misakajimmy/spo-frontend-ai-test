import { apiClient } from './api';

export interface Resource {
  id: string;
  name: string;
  type: string;
}

export const getLibraries = async (): Promise<Resource[]> => {
  const res = await apiClient.get('/api/resources/libraries');
  return res.data as Resource[];
};

export const createLibrary = async (data: Partial<Resource>): Promise<void> => {
  await apiClient.post('/api/resources/libraries', data);
};

export const updateLibrary = async (id: string, data: Partial<Resource>): Promise<void> => {
  await apiClient.put(`/api/resources/libraries/${id}`, data);
};

export const deleteLibrary = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/resources/libraries/${id}`);
};

export const testLibraryConnection = async (id: string): Promise<boolean> => {
  const res = await apiClient.post(`/api/resources/libraries/${id}/test`);
  return res.data as boolean;
};

export const browseResources = async (libraryId?: string): Promise<Resource[]> => {
  const path = libraryId ? `/api/resources/browse/${libraryId}` : '/api/resources/browse';
  const res = await apiClient.get(path);
  return res.data as Resource[];
};