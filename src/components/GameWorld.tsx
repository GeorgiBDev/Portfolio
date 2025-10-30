import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";
import { ProjectPortal } from "./ProjectPortal";
import { Player } from "./Player";
import { Ground } from "./Ground";
import { projects } from "@/data/projects";
import { staticColliders } from "@/data/colliders";
import { CanvasLoader } from "./CanvasLoader";

interface GameWorldProps {
  onProjectEnter: (projectId: number) => void;
  currentLevel: number;
}

export const GameWorld = ({ onProjectEnter, currentLevel }: GameWorldProps) => {
  const [playerPosition, setPlayerPosition] = useState<
    [number, number, number]
  >([-10, 0.5, -8]);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerVelocity = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveSpeed = 0.1;
    const jumpForce = 0.15;
    const gravity = 0.01;
    const playerRadius = 0.5;

    const platforms = projects.map((project) => ({
      x: project.position[0],
      z: project.position[2],
      radius: 2.5,
      levels: [
        { y: 0.8, radius: 1.8 }, // Base top
        { y: 3.2, radius: 1.5 }, // Top platform
      ],
      id: project.id,
    }));

    const updatePosition = () => {
      const newVelocity = playerVelocity.current.clone();

      // Horizontal movement (left/right)
      if (keysPressed.current["a"] || keysPressed.current["arrowleft"]) {
        newVelocity.x = -moveSpeed;
      } else if (
        keysPressed.current["d"] ||
        keysPressed.current["arrowright"]
      ) {
        newVelocity.x = moveSpeed;
      } else {
        newVelocity.x *= 0.8;
      }

      // Forward/backward movement
      if (keysPressed.current["w"] || keysPressed.current["arrowup"]) {
        newVelocity.z = -moveSpeed;
      } else if (keysPressed.current["s"] || keysPressed.current["arrowdown"]) {
        newVelocity.z = moveSpeed;
      } else {
        newVelocity.z *= 0.8;
      }

      // Apply gravity
      newVelocity.y -= gravity;

      // Calculate new position
      const newPos: [number, number, number] = [
        playerPosition[0] + newVelocity.x,
        playerPosition[1] + newVelocity.y,
        playerPosition[2] + newVelocity.z,
      ];

      // Check horizontal collision with structures
      let horizontalCollision = false;
      platforms.forEach((platform) => {
        const distance = Math.sqrt(
          Math.pow(newPos[0] - platform.x, 2) +
            Math.pow(newPos[2] - platform.z, 2)
        );

        // If too close to structure and below top, block horizontal movement
        if (distance < platform.radius + playerRadius && newPos[1] < 3.5) {
          horizontalCollision = true;
          const angle = Math.atan2(
            newPos[2] - platform.z,
            newPos[0] - platform.x
          );
          newPos[0] =
            platform.x + Math.cos(angle) * (platform.radius + playerRadius);
          newPos[2] =
            platform.z + Math.sin(angle) * (platform.radius + playerRadius);
          newVelocity.x = 0;
          newVelocity.z = 0;
        }
      });

      staticColliders.forEach((box) => {
        const halfW = box.size[0] / 2;
        const halfH = box.size[1] / 2;
        const halfD = box.size[2] / 2;
        const baseY = box.position[1] - halfH;
        const topY = box.position[1] + halfH;

        const verticalOverlap =
          newPos[1] >= baseY - 0.5 && newPos[1] <= topY + 0.5;

        if (verticalOverlap) {
          const dx = newPos[0] - box.position[0];
          const dz = newPos[2] - box.position[2];
          const overlapX = halfW + playerRadius - Math.abs(dx);
          const overlapZ = halfD + playerRadius - Math.abs(dz);

          if (overlapX > 0 && overlapZ > 0) {
            if (overlapX < overlapZ) {
              newPos[0] += (dx > 0 ? 1 : -1) * overlapX;
              newVelocity.x = 0;
            } else {
              newPos[2] += (dz > 0 ? 1 : -1) * overlapZ;
              newVelocity.z = 0;
            }
          }
        }
      });

      let isOnPlatform = false;
      let platformHeight = 0;

      platforms.forEach((platform) => {
        const distance = Math.sqrt(
          Math.pow(newPos[0] - platform.x, 2) +
            Math.pow(newPos[2] - platform.z, 2)
        );

        platform.levels.forEach((level) => {
          const isOnThisPlatform = distance < level.radius;
          const isComingFromAbove =
            newPos[1] <= level.y + 0.5 && playerPosition[1] > level.y;
          const isFalling = newVelocity.y <= 0;

          if (isOnThisPlatform && isComingFromAbove && isFalling) {
            isOnPlatform = true;
            platformHeight = Math.max(platformHeight, level.y);
          }
        });
      });

      staticColliders.forEach((box) => {
        const halfW = box.size[0] / 2;
        const halfH = box.size[1] / 2;
        const halfD = box.size[2] / 2;
        const topY = box.position[1] + halfH;

        const withinXZ =
          Math.abs(newPos[0] - box.position[0]) <= halfW &&
          Math.abs(newPos[2] - box.position[2]) <= halfD;
        const isComingFromAbove =
          newPos[1] <= topY + 0.5 && playerPosition[1] > topY;
        const isFalling = newVelocity.y <= 0;

        if (withinXZ && isComingFromAbove && isFalling) {
          isOnPlatform = true;
          platformHeight = Math.max(platformHeight, topY);
        }
      });

      if (newPos[1] <= 0.5) {
        newPos[1] = 0.5;
        newVelocity.y = 0;
        isOnPlatform = true;
      } else if (isOnPlatform && newPos[1] <= platformHeight + 0.5) {
        newPos[1] = platformHeight;
        newVelocity.y = 0;
      }

      if (keysPressed.current[" "] && isOnPlatform) {
        newVelocity.y = jumpForce;
      }

      newPos[0] = Math.max(-15, Math.min(15, newPos[0]));
      newPos[2] = Math.max(-12, Math.min(12, newPos[2]));

      playerVelocity.current = newVelocity;
      setPlayerPosition(newPos);

      // Check portal interaction
      projects.forEach((project) => {
        const distance = Math.sqrt(
          Math.pow(newPos[0] - project.position[0], 2) +
            Math.pow(newPos[2] - project.position[2], 2)
        );
        if (distance < 3.5) {
          onProjectEnter(project.id);
        }
      });
    };

    const interval = setInterval(updatePosition, 16);
    return () => clearInterval(interval);
  }, [playerPosition, onProjectEnter]);

  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas shadows>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera
            makeDefault
            position={[
              playerPosition[0],
              playerPosition[1] + 8,
              playerPosition[2] + 12,
            ]}
          />
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
            target={[
              playerPosition[0],
              playerPosition[1] + 1,
              playerPosition[2],
            ]}
          />

          <ambientLight intensity={0.3} color="#E0AAFF" />

          <directionalLight
            position={[15, 20, 10]}
            intensity={1.2}
            color="#ffffff"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-bias={-0.0001}
          />

          <directionalLight
            position={[-10, 15, -10]}
            intensity={0.6}
            color="#C77DFF"
          />

          <pointLight
            position={[-12, 6, 0]}
            intensity={1.5}
            color="#C77DFF"
            distance={15}
          />
          <pointLight
            position={[12, 6, 0]}
            intensity={1.5}
            color="#7DD3FC"
            distance={15}
          />
          <pointLight
            position={[0, 3, -8]}
            intensity={1.2}
            color="#86EFAC"
            distance={12}
          />

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0.5}
            fade
            speed={1}
          />
          <Environment preset="night" />

          <Ground />
          <Player position={playerPosition} velocity={playerVelocity.current} />

          {projects.map((project) => (
            <ProjectPortal
              key={project.id}
              project={project}
              isUnlocked={project.id <= currentLevel}
            />
          ))}

          <mesh position={[0, -0.5, -10]}>
            <planeGeometry args={[50, 20]} />
            <meshStandardMaterial color="#1a0f2e" transparent opacity={0.3} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
};
