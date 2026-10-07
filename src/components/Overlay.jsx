import SectionFront from './sections/SectionFront.jsx';
import SectionSpecs from './sections/SectionSpecs.jsx';
import SectionSide from './sections/SectionSide.jsx';
import SectionPerformance from './sections/SectionPerformance.jsx';
import SectionRear from './sections/SectionRear.jsx';
import SectionInterior from './sections/SectionInterior.jsx';
import SectionFeatures from './sections/SectionFeatures.jsx';
import SectionGallery from './sections/SectionGallery.jsx';
import SectionFinance from './sections/SectionFinance.jsx';
import Configurator from './Configurator.jsx';
import FinalCTA from './FinalCTA.jsx';
import Footer from './Footer.jsx';
import ScrollHint from './ScrollHint.jsx';
import { useExperience } from '../store/useExperience.js';

export default function Overlay() {
  const toggleConfig = useExperience((s) => s.toggleConfig);
  return (
    <div className="relative z-10">
      {/* Persistent top bar */}
      <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-8 py-6 mix-blend-difference">
        <span className="tracking-luxe text-sm font-semibold">911</span>
        <button onClick={toggleConfig}
          className="tracking-luxe text-xs uppercase hover:opacity-60 transition">
          Configure
        </button>
      </header>

      <ScrollHint />

      {/* Each section = 100vh+, content pinned/fading via Framer */}
      <SectionFront />
      <SectionSpecs />
      <SectionSide />
      <SectionPerformance />
      <SectionRear />
      <SectionInterior />
      <SectionFeatures />
      <SectionGallery />
      <SectionFinance />
      <FinalCTA />
      <Footer />

      <Configurator />
    </div>
  );
}
