import { Button } from "@/components/ui/button";
import { Trophy, Github, Linkedin, Mail, RotateCcw } from "lucide-react";

interface EndScreenProps {
  totalStars: number;
  onRestart: () => void;
}

export const EndScreen = ({ totalStars, onRestart }: EndScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-game-mint via-game-blue to-primary animate-fadeIn">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0tMTIgMTJjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTJjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

      <div className="relative text-center space-y-8 px-8 animate-slideUp">
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <Trophy className="w-20 h-20 text-game-yellow fill-game-yellow animate-pulse-glow" />
          </div>

          <h1 className="font-pixel text-4xl md:text-5xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] leading-relaxed">
            GAME
            <br />
            COMPLETE!
          </h1>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border-2 border-white/20 inline-block">
            <p className="font-pixel text-2xl text-white">
              ⭐ {totalStars} STARS COLLECTED
            </p>
          </div>

          <p className="font-sans text-lg text-white/90 max-w-md mx-auto">
            Thanks for exploring my portfolio!
            <br />
            Let's connect and build something amazing together.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="font-sans bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all"
              onClick={() =>
                window.open("https://github.com/GeorgiBDev", "_blank")
              }
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="font-sans bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/georgiana-balea-533b34192/",
                  "_blank"
                )
              }
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="font-sans bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all"
              onClick={() =>
                (window.location.href = "mailto:hello@example.com")
              }
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
            </Button>
          </div>

          <Button
            onClick={onRestart}
            size="lg"
            className="font-pixel text-sm px-8 py-6 bg-white text-primary hover:bg-white/90 game-glow transform hover:scale-105 transition-all"
          >
            <RotateCcw className="w-5 h-5 mr-3" />
            PLAY AGAIN
          </Button>
        </div>
      </div>
    </div>
  );
};
