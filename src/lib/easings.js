// Bespoke cubic-beziers tuned to feel weighty + premium.
// Framer Motion accepts [x1,y1,x2,y2] arrays.
export const PORSCHE = [0.16, 1, 0.3, 1];      // signature "expensive" ease-out
export const GLIDE  = [0.83, 0, 0.17, 1];       // smooth in-out for camera
export const SOFT   = [0.22, 1, 0.36, 1];       // text reveals
export const SNAP   = [0.65, 0, 0.35, 1];

// GSAP custom ease string (registered in main.jsx via CustomEase if desired)
export const GSAP_PORSCHE = 'M0,0 C0.16,1 0.3,1 1,1';
