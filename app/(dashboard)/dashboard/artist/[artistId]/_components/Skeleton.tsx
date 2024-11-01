const Skeleton = ({
  width,
  height,
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) => {
  return (
    <div
      style={{ width, height }}
      className={`animate-pulse bg-gray-700 rounded ${className}`}
    ></div>
  );
};

export default Skeleton;
