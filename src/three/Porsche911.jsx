import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useExperience, PAINTS, CALIPERS, INTERIORS } from '../store/useExperience.js';
import { damp } from '../lib/lerp.js';

export default function Porsche911() {
  const { scene } = useGLTF('/models/porsche_911.glb');
  const group = useRef();
  const spoiler = useRef();
  const carBody = useRef();

  const paintMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    metalness: 0.5, roughness: 0.4, clearcoat: 0.1, clearcoatRoughness: 0.2,
    envMapIntensity: 0.8,
  }), []);

  const headlight = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#cfe8ff', emissive: '#bfe0ff', emissiveIntensity: 0,
  }), []);
  
  const taillight = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3a0006', emissive: '#ff1f2e', emissiveIntensity: 0,
  }), []);
  
  const caliperMat = useMemo(() => new THREE.MeshStandardMaterial({
    metalness: 0.6, roughness: 0.35,
  }), []);

  useEffect(() => {
    scene.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = o.receiveShadow = true;
      const n = o.name.toLowerCase();
      if (!n.includes('glass') && !n.includes('window') && !n.includes('wheel') && !n.includes('tire') && !n.includes('light') && !n.includes('red') && !n.includes('brake') && !n.includes('caliper')) {
        o.material = paintMat;
      }
      if (n.includes('headlight') || n.includes('drl') || n.includes('light_front')) o.material = headlight;
      if (n.includes('taillight') || n.includes('brake') || n.includes('light_rear') || n.includes('red')) o.material = taillight;
      if (n.includes('caliper') || n.includes('brakes')) o.material = caliperMat;
      if (n.includes('spoiler') || n.includes('wing')) spoiler.current = o;
    });
  }, [scene, paintMat, headlight, taillight, caliperMat]);

  const config = useExperience((s) => s.config);
  const activeHotspot = useExperience((s) => s.activeHotspot);
  const setActiveHotspot = useExperience((s) => s.setActiveHotspot);

  useEffect(() => {
    const p = PAINTS[config.paint];
    if (p) {
      paintMat.color.set(p.hex);
      paintMat.metalness = p.metallic;
      paintMat.clearcoat = p.clearcoat;
    }
    const c = CALIPERS[config.caliper];
    if (c) caliperMat.color.set(c);
  }, [config, paintMat, caliperMat]);

  useFrame((_, dt) => {
    const { scroll, mouse } = useExperience.getState();

    const hl = THREE.MathUtils.smoothstep(scroll, 0.12, 0.28);
    headlight.emissiveIntensity = damp(headlight.emissiveIntensity, hl * 4, 4, dt);

    const rear = THREE.MathUtils.smoothstep(scroll, 0.5, 0.66);
    taillight.emissiveIntensity = damp(taillight.emissiveIntensity, rear * 6, 4, dt);
    if (spoiler.current) {
      spoiler.current.rotation.x = damp(spoiler.current.rotation.x, -rear * 0.32, 3, dt);
      spoiler.current.position.y = damp(spoiler.current.position.y, rear * 0.06, 3, dt);
    }

    const perf = THREE.MathUtils.smoothstep(scroll, 0.85, 1.0);
    group.current.position.y = damp(group.current.position.y, -perf * 0.08, 3, dt);

    group.current.rotation.y = damp(group.current.rotation.y, mouse.x * 0.08, 2.5, dt);
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} ref={carBody} scale={1} rotation={[0, 0, 0]} position={[0, 0, 0]} />
    </group>
  );
}