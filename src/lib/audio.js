// Lightweight audio manager. Unlocks on first user gesture (Loader CTA).
class AudioManager {
  constructor() {
    this.ctx = null;
    this.engine = null;
    this.unlocked = false;
  }
  async unlock() {
    if (this.unlocked) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.unlocked = true;
  }
  async play(url, { loop = false, volume = 1 } = {}) {
    if (!this.ctx) await this.unlock();
    const res = await fetch(url);
    const buf = await this.ctx.decodeAudioData(await res.arrayBuffer());
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    gain.gain.value = volume;
    src.buffer = buf; src.loop = loop;
    src.connect(gain).connect(this.ctx.destination);
    src.start();
    return { src, gain };
  }
  rampGain(node, value, time = 0.6) {
    if (!node || !this.ctx) return;
    node.gain.cancelScheduledValues(this.ctx.currentTime);
    node.gain.linearRampToValueAtTime(value, this.ctx.currentTime + time);
  }
}
export const audio = new AudioManager();
