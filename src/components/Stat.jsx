import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PORSCHE } from '../lib/easings.js';

export default function Stat({ value, suffix = '', label, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const dur = 1400;
    const tick = (t) => {
      if (!start) start = t;
      const k = Math.min((t - start) / dur, 1);
      const e = 1 - Math.pow(1 - k, 3); // cubic ease-out
      setN(value * e);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: PORSCHE }}>
      <div className="text-6xl md:text-7xl font-light tracking-tight">
        {n.toFixed(decimals)}<span className="text-2xl align-top ml-1 text-white/50">{suffix}</span>
      </div>
      <div className="mt-2 tracking-luxe uppercase text-xs text-white/40">{label}</div>
    </motion.div>
  );
}
