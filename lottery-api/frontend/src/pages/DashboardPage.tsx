import { DashboardStats } from '../components';

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Overview of your lottery system</p>
      </div>
      <DashboardStats />
    </div>
  );
};