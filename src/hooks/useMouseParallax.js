import { useEffect } from 'react';
import { useExperience } from '../store/useExperience.js';

export default function useMouseParallax() {
  const setMouse = useExperience((s) => s.setMouse);
  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [setMouse]);
}
