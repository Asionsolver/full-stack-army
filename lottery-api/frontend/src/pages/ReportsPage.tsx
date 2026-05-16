import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { lotteryAPI } from '../services/lottery';
import { TrendingUp, Calendar, DollarSign, Users, Award, BarChart3 } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

type ReportType = 'daily' | 'weekly' | 'monthly';

const ReportCard = ({ title, value, icon: Icon, color }: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)]">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-sm text-[var(--text-tertiary)] mb-1">{title}</p>
      <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
    </div>
  </div>
);

export function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const { data: dailyData, isLoading: dailyLoading } = useQuery({
    queryKey: ['dailyReport', date],
    queryFn: () => lotteryAPI.getDailyReport(date),
    enabled: reportType === 'daily',
  });

  const { data: weeklyData, isLoading: weeklyLoading } = useQuery({
    queryKey: ['weeklyReport', date],
    queryFn: () => lotteryAPI.getWeeklyReport(date),
    enabled: reportType === 'weekly',
  });

  const { data: monthlyData, isLoading: monthlyLoading } = useQuery({
    queryKey: ['monthlyReport'],
    queryFn: () => lotteryAPI.getMonthlyReport(),
    enabled: reportType === 'monthly',
  });

  const isLoading = reportType === 'daily' ? dailyLoading : reportType === 'weekly' ? weeklyLoading : monthlyLoading;
  const report = reportType === 'daily' ? dailyData?.report : reportType === 'weekly' ? weeklyData?.report : monthlyData?.report;

  const reportTypes = [
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly', icon: BarChart3 },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Sales Reports</h2>
          <p className="text-[var(--text-secondary)]">View detailed sales analytics</p>
        </div>
        <div className="flex gap-2">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                reportType === type.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <type.icon className="w-4 h-4 inline mr-2" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {reportType !== 'monthly' && (
        <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-4 border border-[var(--border-color)]">
          <label className="text-sm text-[var(--text-secondary)] mr-4">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
          />
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : report ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ReportCard
              title="Total Sales"
              value={`$${report.totalSales.toLocaleString()}`}
              icon={DollarSign}
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <ReportCard
              title="Total Lotteries"
              value={report.totalLotteries}
              icon={BarChart3}
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
            />
            <ReportCard
              title="Winners Drawn"
              value={report.totalWinners}
              icon={Award}
              color="bg-gradient-to-br from-amber-500 to-orange-600"
            />
            <ReportCard
              title="Average Price"
              value={`$${report.averagePrice.toFixed(2)}`}
              icon={TrendingUp}
              color="bg-gradient-to-br from-purple-500 to-pink-600"
            />
          </div>

          {report.dailyData && (
            <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)]">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Daily Breakdown</h3>
              <div className="grid grid-cols-7 gap-2">
                {Object.entries(report.dailyData).map(([day, data]) => (
                  <div key={day} className="text-center p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <p className="text-xs text-[var(--text-tertiary)] mb-1">{day.slice(5)}</p>
                    <p className="font-bold text-[var(--text-primary)]">{data.count}</p>
                    <p className="text-xs text-[var(--text-secondary)]">${data.sales}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Top Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-[var(--text-tertiary)] border-b border-[var(--border-color)]">
                    <th className="pb-3 font-medium">Rank</th>
                    <th className="pb-3 font-medium">Username</th>
                    <th className="pb-3 font-medium">Tickets</th>
                    <th className="pb-3 font-medium">Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {report.topUsers.map((user, index) => (
                    <tr key={user.username} className="border-b border-[var(--border-color)]/50">
                      <td className="py-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-amber-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-[var(--text-primary)]">{user.username}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{user.count}</td>
                      <td className="py-3 text-[var(--text-primary)] font-medium">${user.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {report.topUsers.length === 0 && (
                <p className="text-center py-8 text-[var(--text-tertiary)]">No data available</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-[var(--text-tertiary)]">No report data available</div>
      )}
    </div>
  );
}

export default ReportsPage;