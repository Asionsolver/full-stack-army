export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-slate-600 border-t-indigo-500 rounded-full animate-spin`}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse" />
      </div>
    </div>
  );
};