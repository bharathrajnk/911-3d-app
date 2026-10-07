import { EffectComposer, Bloom, DepthOfField, Vignette, SMAA }
  from '@react-three/postprocessing';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useExperience } from '../store/useExperience.js';
import { damp } from '../lib/lerp.js';

export default function PostProcessing() {
  const dof = useRef();
  const bloom = useRef();
  const last = useRef(0);

  useFrame((_, dt) => {
    const { scroll } = useExperience.getState();
    // "Motion blur" feel: widen DOF bokeh during fast scroll deltas.
    const delta = Math.abs(scroll - last.current) / Math.max(dt, 0.001);
    last.current = scroll;
    if (bloom.current) {
      // intensify bloom in performance section
      const perf = scroll > 0.8 ? (scroll - 0.8) / 0.2 : 0;
      bloom.current.intensity = damp(bloom.current.intensity, 0.6 + perf * 0.8, 3, dt);
    }
    if (dof.current) {
      dof.current.bokehScale = damp(dof.current.bokehScale, 2 + Math.min(delta * 6, 5), 4, dt);
    }
  });

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <SMAA />
      <DepthOfField ref={dof} focusDistance={0.02} focalLength={0.05} bokehScale={2} />
      <Bloom ref={bloom} intensity={1.5} luminanceThreshold={1.5}
        luminanceSmoothing={0.5} mipmapBlur />
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
}
