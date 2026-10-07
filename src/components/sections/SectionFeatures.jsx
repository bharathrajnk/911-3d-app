import { motion } from 'framer-motion';
import { SOFT } from '../../lib/easings.js';

const FEATURES = [
  { title: 'Apple CarPlay & Android Auto', desc: 'Seamlessly integrate your digital life with native wireless smartphone support.' },
  { title: 'Digital Instrument Cluster', desc: 'Customizable high-resolution dual 7-inch displays flank the analog tachometer.' },
  { title: 'Adaptive Cruise Control', desc: 'Radar-based tech automatically regulates the distance to vehicles ahead.' },
  { title: 'Lane Keep Assist', desc: 'Camera-based system warns and intervenes to prevent unintended lane departures.' }
];

export default function SectionFeatures() {
  return (
    <section className="min-h-screen py-32 px-8 md:px-20 relative glass z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: SOFT }}
          className="hero-line text-4xl md:text-5xl mb-16 text-center"
        >
          Technology & <span className="text-white/50">Safety</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: SOFT }}
              className="p-8 border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
            >
              <h3 className="text-lg font-bold mb-3 tracking-wide">{feat.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
