import { motion } from 'framer-motion';
import { SOFT } from '../../lib/easings.js';

export default function SectionInterior() {
  return (
    <section className="h-screen flex items-center px-8 md:px-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: '-30%' }}
        transition={{ duration: 1.4, ease: SOFT }}
        className="max-w-lg space-y-4">
        <h2 className="hero-line text-5xl md:text-7xl">Driver-centric.</h2>
        <p className="text-white/50 leading-relaxed">
          A cockpit built around one purpose. Ambient light wraps the cabin;
          every surface anticipates intent.
        </p>
      </motion.div>
    </section>
  );
}
