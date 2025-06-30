export type TLoaderProps = {
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
};

const Loader = ({ size = "md", fullScreen = false }: TLoaderProps) => {
  const sizeClasses: Record<"sm" | "md" | "lg" | "xl", string> = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  // Now size is definitely one of the keys
  const LoaderSpinner = () => (
    <div
      className={`animate-spin rounded-full border-t-transparent border-black dark:border-white ${sizeClasses[size]}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <LoaderSpinner />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <LoaderSpinner />
    </div>
  );
};

export default Loader;
