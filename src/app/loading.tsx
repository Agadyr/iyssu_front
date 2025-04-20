import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4 animate-fadeIn">
        <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
        <p className="text-gray-600 font-medium">Загрузка...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 