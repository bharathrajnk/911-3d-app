import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import Porsche911 from './Porsche911.jsx';
import CinematicCamera from './CinematicCamera.jsx';
import Lighting from './Lighting.jsx';
import Floor from './Floor.jsx';
import ExhaustParticles from './ExhaustParticles.jsx';
import PostProcessing from './PostProcessing.jsx';
import { Environment } from '@react-three/drei';
import useMouseParallax from '../hooks/useMouseParallax.js';
import useScrollTimeline from '../hooks/useScrollTimeline.js';

export default function Scene() {
  useScrollTimeline(); // wires window scroll → store.scroll
  useMouseParallax();  // wires mouse → store.mouse

  return (
    <Canvas
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 1.4, 7], fov: 38 }}
    >
      <color attach="background" args={['#070708']} />
      <fog attach="fog" args={['#070708', 9, 22]} />

      <Suspense fallback={null}>
        <CinematicCamera />
        <Lighting />
        <Environment preset="studio" />
        <Porsche911 />
        <ExhaustParticles />
        <Floor />
        <PostProcessing />
        <Preload all />
      </Suspense>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
