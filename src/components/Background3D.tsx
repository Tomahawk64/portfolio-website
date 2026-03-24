"use client";

import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars, TorusKnot, Octahedron } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useTheme } from "next-themes";
import * as THREE from "three";

// 1. Animated Terrain Grid Wave
function TerrainWave() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#10b981" : "#059669";

  useFrame((state) => {
    if (!meshRef.current || !geoRef.current) return;
    const time = state.clock.elapsedTime;
    const scrollY = window.scrollY;

    // Animate vertex positions for a real wave effect
    const positions = geoRef.current.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const waveX = Math.sin(x * 0.3 + time * 0.5 + scrollY * 0.003) * 0.5;
      const waveY = Math.cos(y * 0.3 + time * 0.3) * 0.3;
      positions.setZ(i, waveX + waveY);
    }
    positions.needsUpdate = true;

    meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, -4, -3]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry ref={geoRef} args={[40, 40, 48, 48]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
    </mesh>
  );
}

// 2. Floating Code Symbols (Pure geometry, no font loading needed)
function FloatingSymbols() {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const accentColor = resolvedTheme === "dark" ? "#34d399" : "#059669";
  const blueColor = resolvedTheme === "dark" ? "#60a5fa" : "#2563eb";
  const purpleColor = resolvedTheme === "dark" ? "#a78bfa" : "#7c3aed";

  const shapes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 8 - 3,
        scale: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.3,
        type: Math.floor(Math.random() * 4), // 0=sphere, 1=box, 2=torus, 3=dodecahedron
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scrollY = window.scrollY;
    groupRef.current.rotation.y = scrollY * 0.0003 + state.clock.elapsedTime * 0.01;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  const colors = [accentColor, blueColor, purpleColor, accentColor];

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed * 2} rotationIntensity={shape.speed * 3} floatIntensity={shape.speed * 4}>
          <mesh position={[shape.x, shape.y, shape.z]} scale={shape.scale}>
            {shape.type === 0 && <sphereGeometry args={[1, 8, 8]} />}
            {shape.type === 1 && <boxGeometry args={[1, 1, 1]} />}
            {shape.type === 2 && <torusGeometry args={[1, 0.3, 8, 16]} />}
            {shape.type === 3 && <dodecahedronGeometry args={[1, 0]} />}
            <meshBasicMaterial color={colors[shape.type]} wireframe transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// 3. Central Geometric Core
function GeometricCore() {
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#10b981" : "#059669";
  const innerColor = resolvedTheme === "dark" ? "#3b82f6" : "#2563eb";
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scrollY = window.scrollY;
    groupRef.current.rotation.x = scrollY * 0.001 + state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.y = scrollY * 0.0015 + state.clock.elapsedTime * 0.05;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <TorusKnot args={[1.5, 0.4, 128, 16]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
        </TorusKnot>
      </Float>
      <Float speed={3} rotationIntensity={1.5} floatIntensity={1}>
        <Octahedron args={[0.7, 0]}>
          <meshStandardMaterial color={innerColor} roughness={0.3} metalness={0.9} transparent opacity={0.7} />
        </Octahedron>
      </Float>
    </group>
  );
}

// 4. Particle Field
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(12000), { radius: 12 }) as Float32Array);
  const { resolvedTheme } = useTheme();
  const pointColor = resolvedTheme === "dark" ? "#a7f3d0" : "#10b981";

  useFrame((state) => {
    if (!ref.current) return;
    const scrollY = window.scrollY;
    ref.current.rotation.y = scrollY * 0.0005 + state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = scrollY * 0.0002 + state.clock.elapsedTime * 0.015;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={pointColor}
          size={0.012}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Background3D() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="fixed inset-0 z-[-10] w-full h-full bg-background transition-colors duration-500 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color={resolvedTheme === "dark" ? "#10b981" : "#ffffff"} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color={resolvedTheme === "dark" ? "#3b82f6" : "#ffffff"} />
        <fog attach="fog" args={[resolvedTheme === "dark" ? "#020617" : "#f8fafc", 8, 25]} />

        <Suspense fallback={null}>
          <TerrainWave />
          <FloatingSymbols />
          <GeometricCore />
          <ParticleField />
          <Stars radius={60} depth={60} count={4000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
