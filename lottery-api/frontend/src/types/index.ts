export interface Lottery {
  id: string;
  username: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isWinner?: boolean;
}

export interface Statistics {
  totalLotteries: number;
  totalSales: number;
  totalWinners: number;
  priceDistribution: Record<string, number>;
  userDistribution: Record<string, number>;
  dateDistribution: Record<string, number>;
}

export interface HistoryItem {
  type: string;
  data: unknown;
  timestamp: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
}

export interface Report {
  period: 'daily' | 'weekly' | 'monthly';
  date?: string;
  startDate?: string;
  endDate?: string;
  month?: string;
  year?: number;
  totalSales: number;
  totalLotteries: number;
  totalWinners: number;
  averagePrice: number;
  topUsers: Array<{
    username: string;
    count: number;
    totalPrice: number;
  }>;
  dailyData?: Record<string, { count: number; sales: number }>;
}