import { Suspense, lazy } from 'react';
import Loader from './components/Loader.jsx';
import Overlay from './components/Overlay.jsx';
import { useExperience } from './store/useExperience.js';

const Scene = lazy(() => import('./three/Scene.jsx'));

export default function App() {
  const phase = useExperience((s) => s.phase);

  return (
    <>
      <Loader />

      {/* Fixed canvas layer */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          {phase !== 'loading' && <Scene />}
        </Suspense>
      </div>

      {/* Scrollable DOM overlay */}
      {phase === 'live' && <Overlay />}
    </>
  );
}
