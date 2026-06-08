import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
          {/* Particles + fog + camera subtle motion */}
          <SceneFX />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneFX() {
  const { scene, camera, gl } = useThree();
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    // soft exponential fog for cinematic depth
    scene.fog = new THREE.FogExp2('#050507', 0.012);

    return () => { scene.fog = null as any; };
  }, [scene]);

  useEffect(() => {
    // create a lightweight particle field
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i * 3 + 0] = Math.cos(theta) * Math.cos(phi) * r;
      positions[i * 3 + 1] = Math.sin(phi) * r * 0.6;
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ size: 0.035, color: new THREE.Color('#ffffff'), transparent: true, opacity: 0.06, depthWrite: false });
    const pts = new THREE.Points(geom, mat);
    pts.frustumCulled = false;
    scene.add(pts);

    return () => { scene.remove(pts); geom.dispose(); (mat as any).dispose && (mat as any).dispose(); };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // gentle camera drift
    camera.position.x = Math.sin(t * 0.06) * 0.6;
    camera.position.y = Math.sin(t * 0.03) * 0.25;
    camera.position.z = 7.9 + Math.sin(t * 0.02) * 0.08;
    camera.lookAt(0, 0, 0);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02;
      pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.02;
    }
  });

  return <points ref={pointsRef} />;
}
