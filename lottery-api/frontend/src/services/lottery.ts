import type { Lottery, Statistics, HistoryItem, Report } from '../types';

const BASE_URL = 'http://localhost:3000/api/v1';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const lotteryAPI = {
  getAll: async (): Promise<{ lotteries: Lottery[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries`);
    return handleResponse(response);
  },

  getById: async (id: string): Promise<Lottery> => {
    const response = await fetch(`${BASE_URL}/lotteries/t/${id}`);
    return handleResponse(response);
  },

  getByUsername: async (username: string): Promise<{ lotteries: Lottery[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries/u/${username}`);
    return handleResponse(response);
  },

  sell: async (username: string, price: number): Promise<{ lottery: Lottery }> => {
    const response = await fetch(`${BASE_URL}/lotteries/sell`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, price }),
    });
    return handleResponse(response);
  },

  bulkSell: async (username: string, price: number, quantity: number): Promise<{ lotteries: Lottery[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries/sell/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, price, quantity }),
    });
    return handleResponse(response);
  },

  update: async (id: string, price: number): Promise<Lottery> => {
    const response = await fetch(`${BASE_URL}/lotteries/t/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
    });
    return handleResponse(response);
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${BASE_URL}/lotteries/t/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  deleteByUsername: async (username: string): Promise<{ lotteries: Lottery[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries/u/${username}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  deleteAll: async (): Promise<{ lotteries: Lottery[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries/delete/all`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  getCount: async (): Promise<{ count: number }> => {
    const response = await fetch(`${BASE_URL}/lotteries/count`);
    return handleResponse(response);
  },

  getTotalSales: async (): Promise<{ totalSales: number }> => {
    const response = await fetch(`${BASE_URL}/lotteries/total-sales`);
    return handleResponse(response);
  },

  drawWinners: async (count: number): Promise<{ winners: Lottery[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries/draw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count }),
    });
    return handleResponse(response);
  },

  getWinnersNames: async (): Promise<{ winnersNames: string[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries/winners/names`);
    return handleResponse(response);
  },

  getStatistics: async (): Promise<{ statistics: Statistics }> => {
    const response = await fetch(`${BASE_URL}/lotteries/statistics`);
    return handleResponse(response);
  },

  getHistory: async (): Promise<{ history: HistoryItem[] }> => {
    const response = await fetch(`${BASE_URL}/lotteries/history`);
    return handleResponse(response);
  },

  healthCheck: async (): Promise<{ message: string }> => {
    const response = await fetch(`${BASE_URL}/../health`);
    return handleResponse(response);
  },

  getDailyReport: async (date?: string): Promise<{ report: Report }> => {
    const url = date ? `${BASE_URL}/lotteries/reports/daily?date=${date}` : `${BASE_URL}/lotteries/reports/daily`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  getWeeklyReport: async (date?: string): Promise<{ report: Report }> => {
    const url = date ? `${BASE_URL}/lotteries/reports/weekly?date=${date}` : `${BASE_URL}/lotteries/reports/weekly`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  getMonthlyReport: async (year?: number, month?: number): Promise<{ report: Report }> => {
    const params = new URLSearchParams();
    if (year) params.append('year', String(year));
    if (month) params.append('month', String(month));
    const url = `${BASE_URL}/lotteries/reports/monthly?${params.toString()}`;
    const response = await fetch(url);
    return handleResponse(response);
  },
};