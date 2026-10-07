import { AnimatePresence, motion } from 'framer-motion';
import { useExperience, PAINTS, WHEELS, CALIPERS, INTERIORS } from '../store/useExperience.js';
import { PORSCHE } from '../lib/easings.js';

const Row = ({ title, children }) => (
  <div className="space-y-3">
    <p className="tracking-luxe uppercase text-[10px] text-white/40">{title}</p>
    <div className="flex flex-wrap gap-3">{children}</div>
  </div>
);

const Swatch = ({ active, color, onClick, label, price }) => (
  <div className="flex flex-col items-center gap-2">
    <button onClick={onClick} title={label}
      className="relative w-10 h-10 rounded-full transition-transform hover:scale-110"
      style={{ background: color, boxShadow: active ? '0 0 0 2px #fff, 0 0 18px rgba(255,255,255,.4)' : 'inset 0 0 0 1px rgba(255,255,255,.15)' }} />
    {price !== undefined && (
      <span className="text-[9px] text-white/50 tracking-widest">{price === 0 ? 'STD' : `+$${price}`}</span>
    )}
  </div>
);

export default function Configurator() {
  const { configOpen, toggleConfig, config, setConfig } = useExperience();

  return (
    <AnimatePresence>
      {configOpen && (
        <>
          <motion.div className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleConfig} />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-50 w-[88vw] max-w-md glass p-8 overflow-y-auto"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.9, ease: PORSCHE }}>
            <div className="flex justify-between items-center mb-10">
              <h3 className="tracking-luxe uppercase text-sm">Configure</h3>
              <button onClick={toggleConfig} className="text-white/50 hover:text-white">✕</button>
            </div>

            <div className="space-y-10">
              <Row title="Paint">
                {Object.entries(PAINTS).map(([k, p]) => (
                  <Swatch key={k} color={p.hex} label={p.name} price={p.price}
                    active={config.paint === k} onClick={() => setConfig('paint', k)} />
                ))}
              </Row>
              <Row title="Calipers">
                {Object.entries(CALIPERS).map(([k, hex]) => (
                  <Swatch key={k} color={hex} label={k}
                    active={config.caliper === k} onClick={() => setConfig('caliper', k)} />
                ))}
              </Row>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}