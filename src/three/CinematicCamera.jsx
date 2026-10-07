import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useExperience } from '../store/useExperience.js';
import { damp } from '../lib/lerp.js';

export default function CinematicCamera() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.7, 0));
  const rig = useRef(new THREE.Group());

  const KEYS = useMemo(() => [
    { t: 0.00, pos: [0, 1.35, 7.0],  look: [0, 0.7, 0] },
    { t: 0.18, pos: [0, 0.9, 4.2],   look: [0, 0.6, 0] },
    { t: 0.35, pos: [-4.6, 1.1, 2.4],look: [0, 0.6, 0] },
    { t: 0.52, pos: [0.2, 1.0, -5.2],look: [0, 0.8, 0] },
    { t: 0.70, pos: [2.5, 1.2, 1.2], look: [0.4, 0.6, 0] },
    { t: 0.88, pos: [-1.5, 0.3, 3.8],look: [0, 0.4, 0] },
    { t: 1.00, pos: [0, 0.8, 6.0],   look: [0, 0.6, 0] },
  ], []);

  useFrame((state, dt) => {
    const { scroll, mouse, phase } = useExperience.getState();
    if (phase === 'loading') return;

    let idx = KEYS.findIndex((k) => k.t > scroll);
    if (idx === -1) idx = KEYS.length - 1;
    const next = KEYS[idx];
    const prev = KEYS[Math.max(0, idx - 1)];

    let p = 0;
    if (next.t > prev.t) {
      p = (scroll - prev.t) / (next.t - prev.t);
    }

    const ease = THREE.MathUtils.smoothstep(p, 0, 1);
    
    const idealPos = new THREE.Vector3().fromArray(prev.pos).lerp(new THREE.Vector3().fromArray(next.pos), ease);
    const idealLook = new THREE.Vector3().fromArray(prev.look).lerp(new THREE.Vector3().fromArray(next.look), ease);

    // Apply parallax
    idealPos.x += mouse.x * 0.5;
    idealPos.y += mouse.y * 0.2;
    idealLook.x += mouse.x * 0.1;

    // Dampen
    camera.position.x = damp(camera.position.x, idealPos.x, 3, dt);
    camera.position.y = damp(camera.position.y, idealPos.y, 3, dt);
    camera.position.z = damp(camera.position.z, idealPos.z, 3, dt);

    target.current.x = damp(target.current.x, idealLook.x, 4, dt);
    target.current.y = damp(target.current.y, idealLook.y, 4, dt);
    target.current.z = damp(target.current.z, idealLook.z, 4, dt);

    camera.lookAt(target.current);
  });

  return <group ref={rig} />;
}