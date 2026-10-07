import Stat from '../Stat.jsx';

export default function SectionSide() {
  return (
    <section className="min-h-screen flex items-center justify-end px-8 md:px-20">
      <div className="glass rounded-2xl p-10 max-w-md space-y-10">
        <p className="tracking-luxe uppercase text-xs text-white/40">Performance</p>
        <Stat value={3.2} decimals={1} suffix="s" label="0–100 km/h" />
        <Stat value={331} suffix="km/h" label="Top track speed" />
        <Stat value={478} suffix="hp" label="Output" />
      </div>
    </section>
  );
}
