import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'

interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

interface ChartsProps {
  salesData?: ChartData[]
  priceDistribution?: Record<string, number>
  userDistribution?: Record<string, number>
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6']

export const SalesChart = ({ data }: { data: ChartData[] }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
        <YAxis stroke="#94a3b8" fontSize={12} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
          labelStyle={{ color: '#f1f5f9' }}
        />
        <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorSales)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

export const PriceDistributionChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export const UserDistributionChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" stroke="#94a3b8" fontSize={12} />
          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
          />
          <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const DashboardCharts = ({ priceDistribution, userDistribution }: ChartsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {priceDistribution && (
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Price Distribution</h3>
        <PriceDistributionChart data={priceDistribution} />
      </div>
    )}
    {userDistribution && (
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Top Users</h3>
        <UserDistributionChart data={userDistribution} />
      </div>
    )}
  </div>
)

export default DashboardCharts