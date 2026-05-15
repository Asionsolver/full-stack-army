interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
    <p className="text-red-600 mb-2">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="text-sm text-red-700 hover:underline font-medium">
        Try Again
      </button>
    )}
  </div>
);