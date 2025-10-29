import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "@/data/projects";

interface ProjectPortalProps {
  project: Project;
  isUnlocked: boolean;
}

export const ProjectPortal = ({ project, isUnlocked }: ProjectPortalProps) => {
  const structureRef = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;

    if (portalRef.current) {
      portalRef.current.position.y = 2.5 + Math.sin(time.current * 1.5) * 0.15;
      portalRef.current.rotation.y += delta * 0.6;
    }

    if (structureRef.current && hovered) {
      const scale = 1 + Math.sin(time.current * 3) * 0.02;
      structureRef.current.scale.setScalar(scale);
    }
  });

  const handleClick = () => {
    if (isUnlocked) {
      window.open(project.link, "_blank");
    }
  };

  return (
    <group position={project.position}>
      <group ref={structureRef}>
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2, 2.5, 0.3, 8]} />
          <meshStandardMaterial
            color={isUnlocked ? "#4a3a6a" : "#2a2a2a"}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.8, 2, 0.3, 8]} />
          <meshStandardMaterial
            color={isUnlocked ? "#5a4a7a" : "#333333"}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 0.8, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.6, 1.8, 0.3, 8]} />
          <meshStandardMaterial
            color={isUnlocked ? "#6a5a8a" : "#3a3a3a"}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.5, 2.5, 6]} />
          <meshStandardMaterial
            color={isUnlocked ? project.color : "#444444"}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 1.5;
          const z = Math.sin(rad) * 1.5;

          return (
            <group key={`column-${i}`} position={[x, 0, z]}>
              <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 3, 0.2]} />
                <meshStandardMaterial
                  color={isUnlocked ? project.color : "#444444"}
                  emissive={isUnlocked ? project.color : "#000000"}
                  emissiveIntensity={0.2}
                  roughness={0.2}
                />
              </mesh>
              <mesh position={[0, 3.1, 0]} castShadow>
                <boxGeometry args={[0.4, 0.2, 0.4]} />
                <meshStandardMaterial
                  color={isUnlocked ? project.color : "#444444"}
                  emissive={isUnlocked ? project.color : "#000000"}
                  emissiveIntensity={0.4}
                  roughness={0.1}
                />
              </mesh>
            </group>
          );
        })}

        <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.5, 0.3, 6]} />
          <meshStandardMaterial
            color={isUnlocked ? project.color : "#555555"}
            emissive={isUnlocked ? project.color : "#000000"}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </group>

      <group
        ref={portalRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh>
          <torusGeometry args={[1, 0.12, 6, 6]} />
          <meshStandardMaterial
            color={isUnlocked ? project.color : "#666666"}
            emissive={isUnlocked ? project.color : "#333333"}
            emissiveIntensity={hovered ? 1.2 : 0.6}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>

        <mesh>
          <circleGeometry args={[0.95, 6]} />
          <meshStandardMaterial
            color={isUnlocked ? project.color : "#666666"}
            emissive={isUnlocked ? project.color : "#333333"}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            transparent
            opacity={hovered ? 0.7 : 0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {isUnlocked && (
          <group>
            <mesh rotation={[0, 0, 0]}>
              <octahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial
                color="#FDE047"
                emissive="#FDE047"
                emissiveIntensity={1.5}
                roughness={0.1}
              />
            </mesh>
            <pointLight
              position={[0, 0, 0]}
              intensity={2}
              color="#FDE047"
              distance={4}
            />
          </group>
        )}

        {isUnlocked &&
          [0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180 + time.current;
            const x = Math.cos(rad) * 0.6;
            const y = Math.sin(rad) * 0.6;

            return (
              <mesh key={`orbit-${i}`} position={[x, y, 0]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.8}
                />
              </mesh>
            );
          })}
      </group>

      <Text
        position={[0, 4.5, 0]}
        fontSize={0.35}
        color={isUnlocked ? "#ffffff" : "#666666"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {isUnlocked ? project.name.toUpperCase() : "LOCKED"}
      </Text>

      {hovered && isUnlocked && (
        <group>
          <mesh position={[0, 3.8, 0]}>
            <planeGeometry args={[5, 0.8]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </mesh>
          <Text
            position={[0, 3.8, 0.01]}
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={4.5}
          >
            {project.description}
          </Text>
        </group>
      )}

      <spotLight
        position={[0, 8, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={isUnlocked ? 3 : 0.5}
        color={isUnlocked ? project.color : "#666666"}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight
        position={[0, 2, 0]}
        intensity={isUnlocked ? 2 : 0.3}
        color={project.color}
        distance={10}
      />
    </group>
  );
};
