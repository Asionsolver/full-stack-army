interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="relative bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center backdrop-blur-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl" />
    <div className="relative">
      <p className="text-red-400 mb-3 font-medium">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);