import { useEffect } from 'react';
import { useExperience } from '../store/useExperience.js';
import { clamp } from '../lib/lerp.js';

// The DOM overlay is tall (e.g. 600vh). We map scrollY → 0..1.
export default function useScrollTimeline() {
  const setScroll = useExperience((s) => s.setScroll);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        setScroll(clamp(window.scrollY / Math.max(max, 1)));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [setScroll]);
}
