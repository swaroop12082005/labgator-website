import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({ position, color, distort = 0.3, size = 1 }: {
  position: [number, number, number];
  color: string;
  distort?: number;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2.5}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <Torus ref={ref} args={[0.6, 0.2, 16, 60]} position={position}>
        <MeshWobbleMaterial color={color} factor={0.3} speed={2} emissive={color} emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
      </Torus>
    </Float>
  );
}

function FloatingOcta({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Octahedron ref={ref} args={[0.5]} position={position}>
        <MeshWobbleMaterial color={color} factor={0.2} speed={1.5} emissive={color} emissiveIntensity={0.5} metalness={0.7} roughness={0.2} />
      </Octahedron>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00F5FF" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#B026FF" />
          <pointLight position={[0, 10, -5]} intensity={1.5} color="#FFD700" />

          {/* Main hero sphere */}
          <FloatingSphere position={[3.5, 0.5, -2]} color="#00F5FF" distort={0.4} size={1.8} />

          {/* Secondary spheres */}
          <FloatingSphere position={[-4, 1, -3]} color="#B026FF" distort={0.25} size={1.2} />
          <FloatingSphere position={[1, -2.5, -1]} color="#FFD700" distort={0.35} size={0.7} />

          {/* Torus rings */}
          <FloatingTorus position={[-2.5, -1.5, -2]} color="#00F5FF" />
          <FloatingTorus position={[4.5, -2, -4]} color="#B026FF" />

          {/* Octahedrons */}
          <FloatingOcta position={[-1, 2.5, -1]} color="#00D4A1" />
          <FloatingOcta position={[2.5, 2, -3]} color="#FF6B6B" />
        </Suspense>
      </Canvas>
    </div>
  );
}
