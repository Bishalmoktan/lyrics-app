const Skeleton: React.FC<{ className: string }> = ({ className }) => {
    return <div className={`animate-pulse bg-gray-700 ${className}`} />;
  };
  
  export default Skeleton;
  