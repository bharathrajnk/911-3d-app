import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useExperience } from '../store/useExperience.js';
import { damp } from '../lib/lerp.js';
import * as THREE from 'three';

export default function Lighting() {
  const key = useRef();
  const rim = useRef();
  const ambient = useRef();

  useFrame((_, dt) => {
    const { scroll, mouse } = useExperience.getState();
    // Performance mode (last section) darkens the world.
    const perf = THREE.MathUtils.smoothstep(scroll, 0.8, 1.0);
    ambient.current.intensity = damp(ambient.current.intensity, 0.15 - perf * 0.1, 3, dt);
    key.current.intensity = damp(key.current.intensity, 1.2 - perf * 0.6, 3, dt);
    // Light follows mouse softly
    key.current.position.x = damp(key.current.position.x, 4 + mouse.x * 2, 2, dt);
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.15} />
      <directionalLight
        ref={key} position={[4, 6, 4]} intensity={1.2}
        castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-8, 8, 8, -8, 0.1, 40]} />
      </directionalLight>
      <spotLight ref={rim} position={[-6, 4, -6]} angle={0.4} penumbra={1}
        intensity={1.5} color="#88aaff" />
      <pointLight position={[0, 1, 6]} intensity={0.5} color="#ffffff" />
    </>
  );
}
