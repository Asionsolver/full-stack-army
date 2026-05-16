interface StatCardProps {
  title: string
  value: string | number
  icon: string
  color: string
}

const colorThemes: Record<string, { gradient: string; border: string; iconBg: string; shadow: string }> = {
  indigo: { gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20', border: 'border-indigo-500/30', iconBg: 'from-indigo-500 to-purple-600', shadow: 'shadow-indigo-500/30' },
  emerald: { gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20', border: 'border-emerald-500/30', iconBg: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/30' },
  amber: { gradient: 'from-amber-500/20 via-orange-500/20 to-rose-500/20', border: 'border-amber-500/30', iconBg: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/30' },
}

export const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  const theme = colorThemes[color] || colorThemes.indigo

  return (
    <div className={`relative group overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.gradient} backdrop-blur-sm hover:shadow-xl hover:${theme.shadow} transition-all duration-500`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500 dark:opacity-0" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-[var(--text-secondary)]">{title}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent dark:from-white dark:to-slate-200">
              {value}
            </p>
          </div>
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${theme.iconBg} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            <span className="text-2xl filter drop-shadow-sm">{icon}</span>
          </div>
        </div>
      </div>
    </div>
  )
}