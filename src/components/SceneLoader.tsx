import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export const SceneLoader = () => {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 backdrop-blur-sm transition-opacity duration-500"
      style={{ opacity: progress === 100 ? 0 : 1 }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-20 h-20 border-4 border-t-primary rounded-full animate-spin" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Loading 3D World
          </h2>
          <p className="text-muted-foreground">Preparing your adventure...</p>
        </div>

        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground font-mono">
          {progress.toFixed(0)}%
        </p>
      </div>
    </div>
  );
};
