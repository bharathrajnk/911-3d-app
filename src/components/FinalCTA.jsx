import { motion } from 'framer-motion';
import { PORSCHE } from '../lib/easings.js';

export default function FinalCTA() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center gap-10">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.6, ease: PORSCHE }}
        className="hero-line text-4xl md:text-7xl">
        There is no substitute.
      </motion.h2>
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="px-12 py-4 border border-white/30 tracking-luxe uppercase text-xs
                   hover:bg-white hover:text-black transition-colors duration-500">
        Build your 911
      </motion.button>
    </section>
  );
}
