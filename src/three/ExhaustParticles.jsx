import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useExperience } from '../store/useExperience.js';

const COUNT = 120;

export default function ExhaustParticles() {
  const points = useRef();
  const data = useMemo(() =>
    Array.from({ length: COUNT }, () => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.15, -2.6 - Math.random() * 0.3),
      vel: 0.2 + Math.random() * 0.3,
      life: Math.random(),
    })), []);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    const { scroll } = useExperience.getState();
    const active = THREE.MathUtils.smoothstep(scroll, 0.52, 0.68);
    const arr = geom.attributes.position.array;
    data.forEach((p, i) => {
      p.life += dt * p.vel;
      if (p.life > 1) { p.life = 0; p.pos.set((Math.random()-0.5)*0.4, 0.15, -2.6); }
      arr[i*3]   = p.pos.x + Math.sin(p.life * 6) * 0.05;
      arr[i*3+1] = p.pos.y + p.life * 0.6;
      arr[i*3+2] = p.pos.z - p.life * 0.8;
    });
    geom.attributes.position.needsUpdate = true;
    if (points.current) points.current.material.opacity = active * 0.25;
  });

  return (
    <points ref={points} geometry={geom}>
      <pointsMaterial size={0.08} color="#9aa" transparent opacity={0}
        depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}
