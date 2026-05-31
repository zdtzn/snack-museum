"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Cylinder, Cone, Torus } from "@react-three/drei";
import * as THREE from "three";

type Mood = "idle" | "excited" | "spicy" | "cool" | "happy" | "full";

// 3D 猫模型
function Cat3D({ mood }: { mood: Mood }) {
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftEarRef = useRef<THREE.Mesh>(null);
  const rightEarRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 待机浮动
    if (headRef.current) {
      if (mood === "happy") {
        headRef.current.position.y = Math.sin(t * 4) * 0.3;
      } else if (mood === "idle") {
        headRef.current.position.y = Math.sin(t * 1.5) * 0.15;
      }
      if (mood === "spicy") {
        headRef.current.rotation.z = Math.sin(t * 15) * 0.15;
      }
    }

    // 耳朵微动
    if (leftEarRef.current && mood !== "spicy") {
      leftEarRef.current.rotation.z = Math.sin(t * 2) * 0.15 - 0.3;
      rightEarRef.current!.rotation.z = -Math.sin(t * 2) * 0.15 + 0.3;
    }
  });

  const faceColor = mood === "spicy" ? "#ffaaaa" : "#FFE0B2";
  const earInnerColor = mood === "spicy" ? "#ff6666" : "#FFCC80";

  return (
    <group>
      {/* 身体 */}
      <group ref={bodyRef} position={[0, -0.8, 0]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Sphere args={[0.6, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color={faceColor} roughness={0.7} />
          </Sphere>
        </Float>
      </group>

      {/* 头 */}
      <group ref={headRef}>
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <Sphere args={[0.7, 32, 32]}>
            <meshStandardMaterial color={faceColor} roughness={0.7} />
          </Sphere>

          {/* 耳朵 */}
          <Cone
            ref={leftEarRef}
            args={[0.22, 0.35, 8]}
            position={[-0.35, 0.7, 0]}
            rotation={[0, 0, -0.3]}
          >
            <meshStandardMaterial color="#FFB347" roughness={0.5} />
          </Cone>
          <Cone
            ref={rightEarRef}
            args={[0.22, 0.35, 8]}
            position={[0.35, 0.7, 0]}
            rotation={[0, 0, 0.3]}
          >
            <meshStandardMaterial color="#FFB347" roughness={0.5} />
          </Cone>

          {/* 耳朵内侧 */}
          <Cone args={[0.12, 0.22, 8]} position={[-0.35, 0.65, 0.15]} rotation={[0, 0, -0.3]}>
            <meshStandardMaterial color={earInnerColor} roughness={0.5} />
          </Cone>
          <Cone args={[0.12, 0.22, 8]} position={[0.35, 0.65, 0.15]} rotation={[0, 0, 0.3]}>
            <meshStandardMaterial color={earInnerColor} roughness={0.5} />
          </Cone>

          {/* 眼睛 */}
          <Sphere args={[0.15, 16, 16]} position={[-0.2, 0.15, 0.6]}>
            <meshStandardMaterial color="white" roughness={0.3} />
            <Sphere args={[0.08, 8, 8]} position={[0, 0.03, 0.08]}>
              <meshStandardMaterial color="#222" roughness={0.2} />
            </Sphere>
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[0.2, 0.15, 0.6]}>
            <meshStandardMaterial color="white" roughness={0.3} />
            <Sphere args={[0.08, 8, 8]} position={[0, 0.03, 0.08]}>
              <meshStandardMaterial color="#222" roughness={0.2} />
            </Sphere>
          </Sphere>

          {/* 鼻子 */}
          <Sphere args={[0.06, 8, 8]} position={[0, -0.05, 0.68]}>
            <meshStandardMaterial color="#FF8A80" roughness={0.2} />
          </Sphere>

          {/* 嘴巴 */}
          <Torus args={[0.08, 0.02, 8, 8]} position={[-0.04, -0.12, 0.68]} rotation={[0, 0, 0.5]}>
            <meshStandardMaterial color="#333" roughness={0.5} />
          </Torus>
          <Torus args={[0.08, 0.02, 8, 8]} position={[0.04, -0.12, 0.68]} rotation={[0, 0, -0.5]}>
            <meshStandardMaterial color="#333" roughness={0.5} />
          </Torus>

          {/* 胡须 */}
          {[-1, 1].map((side) =>
            [1, 2, 3].map((n) => (
              <Box
                key={`${side}-${n}`}
                args={[0.3, 0.01, 0.01]}
                position={[side * 0.25, -0.1 * n + 0.05, 0.65]}
                rotation={[0, 0.5 * side, 0]}
              >
                <meshStandardMaterial color="#999" />
              </Box>
            ))
          )}
        </Float>
      </group>
    </group>
  );
}

// 完整的 3D 场景组件
export function Mascot3D({ mood = "idle" }: { mood?: Mood }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="w-48 h-48 relative">
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 2]} intensity={1.5} />
        <pointLight position={[-1, 1, 2]} intensity={0.5} color="#FFB347" />
        <Cat3D mood={mood} />
      </Canvas>
    </div>
  );
}
