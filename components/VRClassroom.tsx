
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Extend JSX namespace to include Three.js elements for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const ClassroomEnvironment = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Main Board */}
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[8, 4, 0.1]} />
        <meshStandardMaterial color="#1e293b" />
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Welcome to the VR Classroom
        </Text>
      </mesh>
    </>
  );
};

const FloatingStudent = ({ position, name, color }: { position: [number, number, number], name: string, color: string }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.005;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={mesh}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshWobbleMaterial color={color} factor={0.2} speed={1} />
        </mesh>
      </Float>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.2}
        color="white"
      >
        {name}
      </Text>
    </group>
  );
};

const VRClassroom: React.FC = () => {
  const [students] = useState([
    { id: '1', name: 'Alex', color: '#3b82f6', pos: [-2, 0, -2] as [number, number, number] },
    { id: '2', name: 'Sarah', color: '#ec4899', pos: [2, 0, -2] as [number, number, number] },
    { id: '3', name: 'Teacher', color: '#10b981', pos: [0, 0, -1] as [number, number, number] },
  ]);

  return (
    <div className="w-full h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl">
      <div className="absolute top-6 left-6 z-10 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
        <h3 className="text-white font-bold flex items-center gap-2">
          <i className="fas fa-vr-cardboard text-blue-400"></i>
          Immersive Learning Space
        </h3>
        <p className="text-slate-300 text-sm mt-1">Join collaborative 3D sessions</p>
      </div>

      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <ClassroomEnvironment />
        {students.map(s => (
          <FloatingStudent key={s.id} position={s.pos} name={s.name} color={s.color} />
        ))}
        <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/20">
          Enter VR Mode
        </button>
        <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-all border border-slate-700">
          Share Screen
        </button>
      </div>
    </div>
  );
};

export default VRClassroom;
