import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-game-purple via-primary to-game-pink animate-fadeIn">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0tMTIgMTJjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTJjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

      <div className="relative text-center space-y-8 px-8 animate-slideUp">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-game-yellow animate-pulse-glow" />
          </div>

          <h1 className="font-pixel text-4xl md:text-6xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] leading-relaxed">
            GAME
            <br />
            PORTFOLIO
          </h1>

          <p className="font-sans text-lg md:text-xl text-white/90 max-w-md mx-auto">
            Explore my creative world through interactive levels
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onStart}
            size="lg"
            className="font-pixel text-sm px-8 py-6 bg-white text-primary hover:bg-white/90 game-glow-secondary transform hover:scale-105 transition-all duration-300"
          >
            START GAME
          </Button>

          <div className="flex gap-6 justify-center text-white/70 font-sans text-sm">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">WASD</kbd>
              <span>Move</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">SPACE</kbd>
              <span>Jump</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="font-sans text-white/50 text-sm">
          Use arrow keys or WASD to navigate
        </p>
      </div>
    </div>
  );
};
