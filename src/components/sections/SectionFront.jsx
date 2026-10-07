import { motion } from 'framer-motion';
import { SOFT } from '../../lib/easings.js';

export default function SectionFront() {
  return (
    <section className="h-screen flex items-center px-8 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-30%' }}
        transition={{ duration: 1.2, ease: SOFT }}>
        <h2 className="hero-line text-5xl md:text-8xl max-w-3xl">
          An icon,<br/><span className="text-white/50">redefined.</span>
        </h2>
      </motion.div>
    </section>
  );
}
