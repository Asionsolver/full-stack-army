interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

export const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  </div>
);