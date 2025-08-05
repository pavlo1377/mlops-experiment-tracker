export const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animate-reverse"></div>
    </div>
    <span className="ml-4 text-cyan-400 font-medium">Processing data...</span>
  </div>
);