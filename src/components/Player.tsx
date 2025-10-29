import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlayerProps {
  position: [number, number, number];
}

export const Player = ({ position }: PlayerProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(time.current * 5) * 0.05;
      meshRef.current.rotation.y = Math.sin(time.current * 2) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position} castShadow>
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[0.7, 0.9, 0.7]} />
        <meshStandardMaterial
          color="#C77DFF"
          emissive="#C77DFF"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      <mesh position={[0, 0.3, 0.36]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial
          color="#E0AAFF"
          emissive="#E0AAFF"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color="#E0AAFF"
          emissive="#E0AAFF"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.4}
        />
      </mesh>

      <mesh castShadow position={[0, 1.4, 0]}>
        <coneGeometry args={[0.1, 0.3, 4]} />
        <meshStandardMaterial
          color="#FDE047"
          emissive="#FDE047"
          emissiveIntensity={0.8}
        />
      </mesh>

      <mesh position={[-0.18, 1.05, 0.31]}>
        <boxGeometry args={[0.12, 0.12, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.18, 1.05, 0.31]}>
        <boxGeometry args={[0.12, 0.12, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      <mesh position={[-0.18, 1.08, 0.32]}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.18, 1.08, 0.32]}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh castShadow position={[-0.5, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial
          color="#C77DFF"
          emissive="#C77DFF"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh castShadow position={[0.5, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial
          color="#C77DFF"
          emissive="#C77DFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh castShadow position={[-0.2, -0.3, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#9D4EDD" roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0.2, -0.3, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#9D4EDD" roughness={0.3} />
      </mesh>

      <pointLight
        position={[0, 0.5, 0]}
        intensity={1.5}
        color="#C77DFF"
        distance={4}
        castShadow
      />
    </group>
  );
};
