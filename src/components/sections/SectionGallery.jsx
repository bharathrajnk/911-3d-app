import { motion } from 'framer-motion';
import { SOFT } from '../../lib/easings.js';
import { useRef, useState } from 'react';

const IMAGES = [
  'https://images.openai.com/static-rsc-4/snoqzWfjZBFwsjbOXj1LsNk3rvo0Ei1z63eQAkQ3NOoveZq31V-0mWZzp7fBbsWJAnucK0XAuDjVBiweWGneZh2pnZxXlkFys9ZDVbO3ANYBRvfOfpwKW83QVRpplEA94P6_wh6jJbBmDTIfDv-1NOKaR5yC2fx6_ZAIYyUjUGAIJRQ8iMmeQc9RWod-sIfF?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/zCzXqLrUsLfx0MxYEP2Y5xwzNtYdd8-cmNAUvzmT2SzdlWgkMVkYamMkW9nkFgxhplOltZEYaE_ZIzJlTQ0tzgSZDH5Cry_4ABC6bwgM5DeiRQxlTXVKoldEIE4crmjzFvfwMuzyPz6wlxd8r5E3BaK4MTVE1DmFzAgM5W7FBgiVXHTATc7Wb04lsLYb8rA4?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/X2rhSBryyBpmIBQRA6F-wxDCUoihrpv5__mpOYBfXOCAuXkZKFY-QRQT0fg_bFz3IkG5mqJufaySOkzM42BiGifAiKyKIjmtww9QyLTlebKmQtj6ekNYdZgqIwP9wuynO6AfRxZKUTCAL2jPq_RBFPwTDbPo5NMQJLqfgQ2SJHYRdyoUvAL7KfWKkV5UzwDQ?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/DoMM9six4IseeqhoZvjtQVFHxI6fCvD-tQu0O3KBN_y7bXclt18S6Dy-mTf-vDP57IruAuhmENKB_g2U2ImivhvQWxdiI7c4UQN3iRChu2LYfbvQF4Xu7eI_k0h2d1mlI2oiy8nzWc07EBFQXT4fobiWsrK3JhfjObdhwPsiTuzfFEfgvYTmBkESZQ1Y2et1?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/HPRHs8pMWiKRF1MiYZ37tkkL9Ic6cIpyQkyfpVM7w-nyGrUoGavmO2kvjt2y17ws0lj6QZp4-N_UUcpe0-k3r7_5ZVXn-FeAQ99zO8B7Iyz39WZ1EFzcrkPeLyqdMubSXHf0P3R90yaV_lOM-IVS288eCNh5t1ATV_l6S1U6cP-JZR08Lz3mv1KXW5SIGPy5?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/FMKvHShp5cc8kyZUuRFi5adPbJZsf0FtoSc4xujYIZB6WV0O-n4lmAlv29kv28Ygbt9CQvu_onOudb1l5wJjuAD2dGPyEtYhRuI-ZGb-V6uZ6DukbLTm0iNtfkNG4tFwL3G2aXtsuqdes1wZ1aVL75VluMn3R4ij-NYnP1fO-GJszZufuihER_DPpx7Uug9O?purpose=fullsize'
];

export default function SectionGallery() {
  const [index, setIndex] = useState(0);

  return (
    <section className="py-24 px-8 md:px-20 relative bg-ink z-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="hero-line text-4xl mb-12">Gallery</h2>
        
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
          <motion.img 
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: SOFT }}
            src={IMAGES[index]} 
            alt="Porsche Gallery" 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => setIndex((i) => (i === 0 ? IMAGES.length - 1 : i - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition"
          >
            &#8592;
          </button>
          <button 
            onClick={() => setIndex((i) => (i === IMAGES.length - 1 ? 0 : i + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition"
          >
            &#8594;
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {IMAGES.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`relative flex-shrink-0 w-32 aspect-video rounded-lg overflow-hidden transition-all duration-300 ${index === i ? 'ring-2 ring-white opacity-100 scale-105' : 'opacity-50 hover:opacity-100'}`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
