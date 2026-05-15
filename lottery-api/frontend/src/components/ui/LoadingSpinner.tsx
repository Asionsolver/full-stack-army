export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}></div>
    </div>
  );
};