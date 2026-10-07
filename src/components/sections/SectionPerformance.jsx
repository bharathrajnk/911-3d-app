import Stat from '../Stat.jsx';
import { motion } from 'framer-motion';
import { PORSCHE } from '../../lib/easings.js';

export default function SectionPerformance() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center gap-12 px-8">
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        whileInView={{ opacity: 1, letterSpacing: '0.22em' }}
        transition={{ duration: 1.4, ease: PORSCHE }}
        className="uppercase text-xs text-porsche">Performance Mode</motion.p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <Stat value={379} suffix="HP" label="Power" />
          <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden rounded-full"><motion.div className="h-full bg-porsche" initial={{ width: 0 }} whileInView={{ width: '60%' }} transition={{ duration: 1.5, delay: 0.2 }} /></div>
        </div>
        <div className="flex flex-col items-center">
          <Stat value={4.2} decimals={1} suffix="sec" label="0–100 km/h" />
          <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden rounded-full"><motion.div className="h-full bg-porsche" initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.3 }} /></div>
        </div>
        <div className="flex flex-col items-center">
          <Stat value={293} suffix="km/h" label="Top Speed" />
          <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden rounded-full"><motion.div className="h-full bg-porsche" initial={{ width: 0 }} whileInView={{ width: '75%' }} transition={{ duration: 1.5, delay: 0.4 }} /></div>
        </div>
        <div className="flex flex-col items-center">
          <Stat value={450} suffix="Nm" label="Torque" />
          <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden rounded-full"><motion.div className="h-full bg-porsche" initial={{ width: 0 }} whileInView={{ width: '65%' }} transition={{ duration: 1.5, delay: 0.5 }} /></div>
        </div>
      </div>
    </section>
  );
}
