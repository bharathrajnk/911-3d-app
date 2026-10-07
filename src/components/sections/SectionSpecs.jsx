import { motion } from 'framer-motion';
import { SOFT } from '../../lib/easings.js';

const SPECS = [
  { label: 'Engine', value: '3.0L Twin-Turbo Flat-6' },
  { label: 'Horsepower', value: '379 HP' },
  { label: 'Torque', value: '450 Nm' },
  { label: 'Top Speed', value: '293 km/h' },
  { label: '0–100 km/h', value: '4.2 sec' },
  { label: 'Transmission', value: '8-Speed PDK' },
  { label: 'Drivetrain', value: 'Rear-Wheel Drive' },
];

export default function SectionSpecs() {
  return (
    <section className="h-screen flex items-center justify-end px-8 md:px-20 relative">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: '-20%' }}
        transition={{ duration: 1.0, ease: SOFT }}
        className="w-full max-w-md glass p-8 rounded-xl border border-white/10"
      >
        <h3 className="tracking-luxe uppercase text-sm mb-8 text-porsche">Key Specifications</h3>
        <div className="flex flex-col">
          {SPECS.map((spec, i) => (
            <div key={i} className="flex justify-between py-4 border-b border-white/10 last:border-0">
              <span className="text-white/50 text-sm tracking-wide">{spec.label}</span>
              <span className="text-white font-mono text-sm">{spec.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
