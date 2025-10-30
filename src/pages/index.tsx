import { useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { GameWorld } from "@/components/GameWorld";
import { GameHUD } from "@/components/GameHUD";
import { EndScreen } from "@/components/EndScreen";
import { projects } from "@/data/projects";
import { toast } from "sonner";

const Index = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "end">(
    "start"
  );
  const [currentLevel, setCurrentLevel] = useState(1);
  const [collectedStars, setCollectedStars] = useState(0);
  const [visitedProjects, setVisitedProjects] = useState<Set<number>>(
    new Set()
  );

  const handleStart = () => {
    setGameState("playing");
    toast.success("Game started! Use WASD or arrow keys to move", {
      duration: 4000,
    });
  };

  const handleProjectEnter = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);

    if (
      project &&
      projectId <= currentLevel &&
      !visitedProjects.has(projectId)
    ) {
      setVisitedProjects((prev) => new Set([...prev, projectId]));
      setCollectedStars((prev) => prev + 1);

      toast.success(`✨ Discovered: ${project.name}!`, {
        description: "Click to view project",
        action: {
          label: "Open",
          onClick: () => window.open(project.link, "_blank"),
        },
        duration: 5000,
      });

      if (projectId === currentLevel && currentLevel < projects.length) {
        setTimeout(() => {
          setCurrentLevel((prev) => prev + 1);
          toast.info(`🎮 Level ${projectId + 1} unlocked!`, {
            duration: 3000,
          });
        }, 1000);
      }

      if (visitedProjects.size + 1 === projects.length) {
        setTimeout(() => {
          setGameState("end");
          toast.success("🎉 All projects discovered!", {
            duration: 3000,
          });
        }, 2000);
      }
    }
  };

  const handleRestart = () => {
    setGameState("start");
    setCurrentLevel(1);
    setCollectedStars(0);
    setVisitedProjects(new Set());
  };

  const currentProject = projects[currentLevel - 1];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {gameState === "start" && <StartScreen onStart={handleStart} />}

      {gameState === "playing" && (
        <>
          <GameWorld
            onProjectEnter={handleProjectEnter}
            currentLevel={currentLevel}
          />
          <GameHUD
            currentLevel={currentLevel}
            totalLevels={projects.length}
            projectName={currentProject?.name || ""}
            collectedStars={collectedStars}
          />
        </>
      )}

      {gameState === "end" && (
        <EndScreen totalStars={collectedStars} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Index;
