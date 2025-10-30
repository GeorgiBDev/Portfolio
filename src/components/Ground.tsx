import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Ground = () => {
  const platformsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (platformsRef.current) {
      platformsRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.1 - 2;
      });
    }
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200, 40, 40]} />
        <meshStandardMaterial color="#2a1a4a" roughness={0.8} metalness={0.1} />
      </mesh>

      <gridHelper
        args={[200, 80, "#7c3aed", "#4a2a6a"]}
        position={[0, 0.01, 0]}
      />

      <group position={[0, 0, 0]}>
        <mesh position={[0, -0.7, 0]} receiveShadow castShadow>
          <boxGeometry args={[60, 0.4, 60]} />
          <meshStandardMaterial
            color="#3a2a5a"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, -0.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[55, 0.4, 55]} />
          <meshStandardMaterial
            color="#4a3a6a"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[50, 0.2, 50]} />
          <meshStandardMaterial
            color="#5a4a7a"
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {[-12, -6, 0, 6, 12].map((x, i) => (
          <mesh key={`edge-${i}`} position={[x, 0.2, 4.5]} castShadow>
            <boxGeometry args={[0.3, 0.6, 0.3]} />
            <meshStandardMaterial
              color="#C77DFF"
              emissive="#C77DFF"
              emissiveIntensity={0.3}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      <group ref={platformsRef}>
        {[
          { pos: [-15, -2, -8], size: [4, 6, 4], color: "#C77DFF" },
          { pos: [15, -2, -8], size: [5, 4, 5], color: "#7DD3FC" },
          { pos: [0, -2, -12], size: [3, 8, 3], color: "#86EFAC" },
        ].map((platform, i) => (
          <group
            key={`bg-platform-${i}`}
            position={platform.pos as [number, number, number]}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={platform.size as [number, number, number]} />
              <meshStandardMaterial
                color={platform.color}
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>
            <mesh position={[0, platform.size[1] / 2 + 0.2, 0]} castShadow>
              <boxGeometry
                args={[platform.size[0] + 0.5, 0.4, platform.size[2] + 0.5]}
              />
              <meshStandardMaterial
                color={platform.color}
                emissive={platform.color}
                emissiveIntensity={0.2}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>

      {[-10, -5, 0, 5, 10].map((x, i) => (
        <group key={`crystal-${i}`} position={[x, 0.8, -4]}>
          <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color={
                i % 3 === 0 ? "#7DD3FC" : i % 3 === 1 ? "#C77DFF" : "#FDE047"
              }
              emissive={
                i % 3 === 0 ? "#7DD3FC" : i % 3 === 1 ? "#C77DFF" : "#FDE047"
              }
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>
          <pointLight
            position={[0, 0, 0]}
            intensity={0.8}
            color={
              i % 3 === 0 ? "#7DD3FC" : i % 3 === 1 ? "#C77DFF" : "#FDE047"
            }
            distance={6}
            castShadow
          />
        </group>
      ))}

      {[
        [-13, 4.5],
        [13, -4.5],
      ].map((pos, i) => (
        <group key={`column-${i}`} position={[pos[0], 2, pos[1]]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.4, 4, 6]} />
            <meshStandardMaterial color="#5a4a7a" roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.3, 0]} castShadow>
            <boxGeometry args={[0.8, 0.3, 0.8]} />
            <meshStandardMaterial color="#6a5a8a" roughness={0.2} />
          </mesh>
        </group>
      ))}
    </>
  );
};
