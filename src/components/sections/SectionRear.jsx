import { motion } from 'framer-motion';
import { SOFT } from '../../lib/easings.js';

export default function SectionRear() {
  return (
    <section className="h-screen flex items-end px-8 md:px-20 pb-24">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-30%' }}
        transition={{ duration: 1.1, ease: SOFT }}
        className="hero-line text-4xl md:text-6xl max-w-xl">
        Adaptive aero. <span className="text-white/50">Deployed on demand.</span>
      </motion.h2>
    </section>
  );
}
