import { motion } from 'framer-motion';
import { useExperience } from '../store/useExperience.js';

export default function ScrollHint() {
  const scroll = useExperience((s) => s.scroll);
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      animate={{ opacity: scroll > 0.02 ? 0 : 1 }}
      transition={{ duration: 0.6 }}>
      <span className="tracking-luxe uppercase text-[10px] text-white/40">Scroll</span>
      <motion.div className="w-px h-10 bg-white/40"
        animate={{ scaleY: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
    </motion.div>
  );
}
