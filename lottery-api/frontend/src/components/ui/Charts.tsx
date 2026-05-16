import { useMemo } from 'react'
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

const chartTooltipStyle = {
  contentStyle: { 
    backgroundColor: 'var(--bg-card)', 
    border: '1px solid var(--border-color)', 
    borderRadius: '8px', 
    color: 'var(--text-primary)'
  },
  labelStyle: { color: 'var(--text-primary)' }
}

export const SalesChart = ({ data }: { data: ChartData[] }) => {
  if (!data || data.length === 0) return null
  
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey="name" stroke="var(--text-tertiary)" fontSize={12} tick={{fill: 'var(--text-tertiary)'}} />
          <YAxis stroke="var(--text-tertiary)" fontSize={12} tick={{fill: 'var(--text-tertiary)'}} />
          <Tooltip {...chartTooltipStyle} />
          <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorSales)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export const PriceDistributionChart = ({ data }: { data: Record<string, number> | undefined }) => {
  const chartData = useMemo(() => {
    if (!data) return []
    const entries = Object.entries(data)
    if (entries.length === 0) return []
    return entries.map(([name, value]) => ({ name, value }))
  }, [data])

  if (chartData.length === 0) return null
  
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
            labelLine={{ stroke: 'var(--text-tertiary)' }}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip {...chartTooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export const UserDistributionChart = ({ data }: { data: Record<string, number> | undefined }) => {
  const chartData = useMemo(() => {
    if (!data) return []
    const entries = Object.entries(data)
    if (entries.length === 0) return []
    return entries
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
  }, [data])

  if (chartData.length === 0) return null
  
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis type="number" stroke="var(--text-tertiary)" fontSize={12} tick={{fill: 'var(--text-tertiary)'}} />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="var(--text-tertiary)" 
            fontSize={12} 
            width={80} 
            tick={{fill: 'var(--text-tertiary)'}}
          />
          <Tooltip {...chartTooltipStyle} />
          <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const DashboardCharts = ({ priceDistribution, userDistribution }: ChartsProps) => {
  // Show charts if either distribution has data
  const showPriceChart = priceDistribution && Object.keys(priceDistribution).length > 0
  const showUserChart = userDistribution && Object.keys(userDistribution).length > 0

  // If no data at all, return null - the page will show the empty state message
  if (!showPriceChart && !showUserChart) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {showPriceChart && (
        <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Price Distribution</h3>
          <PriceDistributionChart data={priceDistribution} />
        </div>
      )}
      {showUserChart && (
        <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl p-6 border border-[var(--border-color)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Top Users</h3>
          <UserDistributionChart data={userDistribution} />
        </div>
      )}
    </div>
  )
}

export default DashboardCharts