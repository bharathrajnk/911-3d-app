import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '../store/useExperience.js';
import { audio } from '../lib/audio.js';
import { PORSCHE } from '../lib/easings.js';

export default function Loader() {
  const { phase, setPhase } = useExperience();
  const [armed, setArmed] = useState(false);
  const engineRef = useRef(null);

  const begin = async () => {
    setArmed(true);
    try {
      await audio.unlock();
      audio.play('/audio/ignition.mp3', { volume: 0.7 }).catch(e => console.warn('Audio missing', e));
      engineRef.current = await audio.play('/audio/engine_loop.mp3', { loop: true, volume: 0.0 });
      if (engineRef.current) audio.rampGain(engineRef.current.gain, 0.18, 3);
    } catch (e) {
      console.warn("Audio skipped");
    }

    setPhase('intro');
    setTimeout(() => setPhase('live'), 5200);
  };

  return (
    <AnimatePresence>
      {phase !== 'live' && (
        <motion.div
          className="fixed inset-0 z-50 bg-ink flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: PORSCHE }}
        >
          {!armed && (
            <motion.button
              onClick={begin}
              className="text-white/70 tracking-luxe uppercase text-sm border border-white/20 px-10 py-4 hover:text-white hover:border-white/50 transition-colors"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1.2 }}
            >
              Enter the experience
            </motion.button>
          )}

          {armed && (
            <>
              <motion.div
                className="absolute top-0 bottom-0 w-[2px] bg-white"
                style={{ boxShadow: '0 0 40px 10px rgba(255,255,255,0.4)' }}
                initial={{ left: 0 }}
                animate={{ left: '100%' }}
                transition={{ duration: 2, ease: [0.8, 0, 0.2, 1] }}
              />
              <motion.div
                className="text-4xl md:text-6xl tracking-luxe font-bold text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 2, ease: PORSCHE }}
              >
                PORSCHE
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}