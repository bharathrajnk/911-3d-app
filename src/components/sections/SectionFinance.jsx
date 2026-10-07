import { useState } from 'react';
import { motion } from 'framer-motion';
import { SOFT } from '../../lib/easings.js';

export default function SectionFinance() {
  const [downPayment, setDownPayment] = useState(20000);
  const [months, setMonths] = useState(60);
  const basePrice = 114400; // base price of Carrera
  const interestRate = 0.059; // 5.9% APR

  // Basic EMI calculation
  const principal = basePrice - downPayment;
  const monthlyRate = interestRate / 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <section className="py-32 px-8 md:px-20 relative bg-smoke z-20">
      <div className="max-w-4xl mx-auto glass p-8 md:p-16 rounded-2xl border border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: SOFT }}
          className="text-center mb-12"
        >
          <h2 className="hero-line text-4xl mb-4">Finance Calculator</h2>
          <p className="text-white/50 text-sm tracking-wide">Estimate your monthly payment for the 911 Carrera.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm tracking-widest uppercase text-white/70">Down Payment</label>
                <span className="font-mono text-porsche">${downPayment.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="80000" step="1000" 
                value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-porsche h-1 bg-white/10 rounded-full appearance-none outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm tracking-widest uppercase text-white/70">Loan Term</label>
                <span className="font-mono text-porsche">{months} Months</span>
              </div>
              <input 
                type="range" min="24" max="72" step="12" 
                value={months} onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-porsche h-1 bg-white/10 rounded-full appearance-none outline-none"
              />
            </div>
            
            <div className="pt-4 border-t border-white/10 flex justify-between text-xs text-white/40 font-mono">
              <span>Base Price: ${basePrice.toLocaleString()}</span>
              <span>Est. APR: 5.9%</span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-8 bg-black/40 rounded-xl border border-white/5">
            <span className="text-xs tracking-widest uppercase text-white/50 mb-4">Estimated Monthly</span>
            <div className="text-5xl md:text-6xl font-light tracking-tighter text-white mb-2">
              <span className="text-2xl align-top mr-1 text-white/40">$</span>
              {Math.round(emi).toLocaleString()}
            </div>
            <span className="text-xs text-white/30 font-mono">Excludes taxes & fees</span>
          </div>
        </div>
      </div>
    </section>
  );
}
