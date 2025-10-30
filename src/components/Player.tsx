import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlayerProps {
  position: [number, number, number];
  velocity: THREE.Vector3;
}

export const Player = ({ position, velocity }: PlayerProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;

    const isMoving = Math.abs(velocity.x) > 0.01 || Math.abs(velocity.z) > 0.01;
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);

    if (meshRef.current) {
      if (isMoving) {
        targetRotation.current = Math.atan2(velocity.x, velocity.z);
      }

      const rotDiff = targetRotation.current - currentRotation.current;
      const normalizedDiff = Math.atan2(Math.sin(rotDiff), Math.cos(rotDiff));
      currentRotation.current += normalizedDiff * delta * 10;
      meshRef.current.rotation.y = currentRotation.current;

      // Walking animation
      if (isMoving) {
        const walkCycle = Math.sin(time.current * 8 * speed * 5);

        // Legs - walking animation
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = walkCycle * 0.5;
          rightLegRef.current.rotation.x = -walkCycle * 0.5;
        }

        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = -walkCycle * 0.3;
          rightArmRef.current.rotation.x = walkCycle * 0.3;
        }

        // Body bounce when walking
        if (bodyRef.current) {
          bodyRef.current.position.y = 0.3 + Math.abs(walkCycle) * 0.05;
        }
      } else {
        const idleBob = Math.sin(time.current * 2) * 0.02;
        if (bodyRef.current) {
          bodyRef.current.position.y = 0.3 + idleBob;
        }

        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x *= 0.9;
          rightLegRef.current.rotation.x *= 0.9;
        }
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x *= 0.9;
          rightArmRef.current.rotation.x *= 0.9;
        }
      }

      meshRef.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <group ref={meshRef} position={position} castShadow>
      <mesh ref={bodyRef} castShadow receiveShadow position={[0, 0.3, 0]}>
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

      <mesh ref={leftArmRef} castShadow position={[-0.5, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial
          color="#C77DFF"
          emissive="#C77DFF"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={rightArmRef} castShadow position={[0.5, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial
          color="#C77DFF"
          emissive="#C77DFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={leftLegRef} castShadow position={[-0.2, -0.3, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#9D4EDD" roughness={0.3} />
      </mesh>
      <mesh ref={rightLegRef} castShadow position={[0.2, -0.3, 0]}>
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
