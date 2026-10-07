export default function Footer() {
  return (
    <footer className="py-12 px-8 md:px-20 bg-ink border-t border-white/10 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="tracking-luxe text-sm font-semibold">PORSCHE 911</div>
        <div className="flex gap-6 text-xs text-white/50 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
        <div className="text-xs text-white/30 font-mono">
          © {new Date().getFullYear()} Porsche Experience Clone
        </div>
      </div>
    </footer>
  );
}
