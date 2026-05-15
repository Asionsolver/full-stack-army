import { WifiOff } from 'lucide-react'

interface ConnectionStatusProps {
  isConnected: boolean
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg">
      {isConnected ? (
        <>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 text-slate-400" />
          <span className="text-xs text-slate-400">Offline</span>
        </>
      )}
    </div>
  )
}

export default ConnectionStatus