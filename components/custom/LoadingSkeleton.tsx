import { Loader } from "lucide-react";

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-[450px] md:h-[600px] bg-gray-900">
      <Loader className="animate-spin"/>
    </div>
  );
};

export default LoadingSkeleton;
