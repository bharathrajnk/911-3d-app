export const lerp = (a, b, t) => a + (b - a) * t;

// Frame-rate independent damping — the secret to "no sudden jumps".
// lambda controls stiffness; dt is delta time.
export const damp = (current, target, lambda, dt) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

export const damp3 = (vec, target, lambda, dt) => {
  vec.x = damp(vec.x, target.x ?? target[0], lambda, dt);
  vec.y = damp(vec.y, target.y ?? target[1], lambda, dt);
  vec.z = damp(vec.z, target.z ?? target[2], lambda, dt);
  return vec;
};

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const map = (v, a, b, c, d) => c + ((v - a) / (b - a)) * (d - c);
