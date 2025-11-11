import { apiClient } from './api';

export interface Account {
  id: string;
  platform: string;
  username: string;
  status: string;
}

export const getAccounts = async (): Promise<Account[]> => {
  const res = await apiClient.get('/api/accounts');
  return res.data as Account[];
};

export const getAccountById = async (id: string): Promise<Account> => {
  const res = await apiClient.get(`/api/accounts/${id}`);
  return res.data as Account;
};

export const updateAccount = async (id: string, data: Partial<Account>): Promise<void> => {
  await apiClient.put(`/api/accounts/${id}`, data);
};

export const deleteAccount = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/accounts/${id}`);
};

export const getAccountsByPlatform = async (platform: string): Promise<Account[]> => {
  const res = await apiClient.get(`/api/accounts/platform/${platform}`);
  return res.data as Account[];
};
