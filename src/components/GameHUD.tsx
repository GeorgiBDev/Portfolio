import { Star, MapPin } from "lucide-react";

interface GameHUDProps {
  currentLevel: number;
  totalLevels: number;
  projectName: string;
  collectedStars: number;
}

export const GameHUD = ({
  currentLevel,
  totalLevels,
  projectName,
  collectedStars,
}: GameHUDProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        <div className="bg-card/80 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-primary/20 game-glow">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary animate-pulse-glow" />
            <div>
              <p className="font-pixel text-xs text-muted-foreground">LEVEL</p>
              <p className="font-pixel text-lg text-foreground">
                {currentLevel} / {totalLevels}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-md rounded-2xl px-8 py-4 border-2 border-primary/20 game-glow max-w-md">
          <p className="font-sans text-sm text-muted-foreground text-center mb-1">
            Current Project
          </p>
          <p className="font-pixel text-base text-foreground text-center truncate">
            {projectName}
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-game-yellow/30 game-glow-secondary">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-game-yellow fill-game-yellow animate-pulse-glow" />
            <div>
              <p className="font-pixel text-xs text-muted-foreground">STARS</p>
              <p className="font-pixel text-lg text-foreground">
                {collectedStars}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="inline-block bg-card/60 backdrop-blur-md rounded-xl px-6 py-2 border border-primary/10">
          <p className="font-sans text-xs text-muted-foreground">
            Walk to enter the project
          </p>
        </div>
      </div>
    </div>
  );
};
