"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { useState, useEffect } from "react";

function FloatingObjects() {
  const sphereRef = useRef<any>(null);
  const boxRef = useRef<any>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate objects based on scroll
  useFrame(() => {
    if (sphereRef.current) sphereRef.current.position.y = 1 - scrollY * 0.002;
    if (boxRef.current) boxRef.current.position.y = -1 + scrollY * 0.0015;
  });

  return (
    <>
      <mesh ref={sphereRef} position={[0, 1, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff6f61" />
      </mesh>

      <mesh ref={boxRef} position={[-2, -1, -3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4b2e1e" />
      </mesh>
    </>
  );
}

export default function Background3D() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />

      <Suspense fallback={null}>
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade />
        <FloatingObjects />
      </Suspense>
    </Canvas>
  );
}