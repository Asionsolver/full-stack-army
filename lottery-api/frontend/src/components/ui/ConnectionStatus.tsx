import { WifiOff } from 'lucide-react'

interface ConnectionStatusProps {
  isConnected: boolean
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-input)] rounded-lg">
      {isConnected ? (
        <>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 text-[var(--text-muted)]" />
          <span className="text-xs text-[var(--text-muted)]">Offline</span>
        </>
      )}
    </div>
  )
}

export default ConnectionStatus