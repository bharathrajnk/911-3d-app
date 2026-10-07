import { create } from 'zustand';

export const PAINTS = {
  black:       { name: 'Black',         hex: '#0b0c0e', metallic: 0.0, clearcoat: 1, price: 0 },
  white:       { name: 'White',         hex: '#eef0f2', metallic: 0.0, clearcoat: 1, price: 0 },
  guardsRed:   { name: 'Guards Red',    hex: '#c8102e', metallic: 0.0, clearcoat: 1, price: 0 },
  racingYellow:{ name: 'Racing Yellow', hex: '#f6d525', metallic: 0.0, clearcoat: 1, price: 0 },
  gtSilver:    { name: 'GT Silver',     hex: '#b8bcc0', metallic: 1.0, clearcoat: 1, price: 840 },
  gentianBlue: { name: 'Gentian Blue',  hex: '#1b2a4a', metallic: 1.0, clearcoat: 1, price: 840 },
};

export const WHEELS = {
  carreraS:  { name: 'Carrera S',  spokeColor: '#1a1a1a' },
  turboGT:   { name: 'Turbo GT',   spokeColor: '#9a9a9a' },
  sportClassic:{ name:'Sport Classic', spokeColor: '#c9a24b' },
};

export const CALIPERS = {
  black:  '#111111',
  red:    '#c8102e',
  yellow: '#f2c200', // ceramic PCCB
  silver: '#c4c4c4',
};

export const INTERIORS = {
  blackLeather: { name: 'Black Leather', hex: '#15151a' },
  bordeaux:     { name: 'Bordeaux Red',  hex: '#4a1822' },
  cognac:       { name: 'Cognac',        hex: '#7a4a24' },
  graphite:     { name: 'Graphite',      hex: '#2a2c30' },
};

export const useExperience = create((set) => ({
  phase: 'loading',          // loading → intro → live
  setPhase: (phase) => set({ phase }),

  scroll: 0,                 // 0..1 normalized timeline
  setScroll: (scroll) => set({ scroll }),

  mouse: { x: 0, y: 0 },     // -1..1
  setMouse: (mouse) => set({ mouse }),

  configOpen: false,
  toggleConfig: () => set((s) => ({ configOpen: !s.configOpen })),

  config: {
    paint: 'gtSilver',
    wheel: 'turboGT',
    caliper: 'red',
    interior: 'blackLeather',
  },
  setConfig: (key, value) =>
    set((s) => ({ config: { ...s.config, [key]: value } })),
}));
