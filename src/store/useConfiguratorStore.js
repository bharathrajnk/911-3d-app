import { create } from 'zustand';

export const porscheColors = {
  'Guards Red': '#cc0000',
  'Jet Black Metallic': '#111111',
  'Carrara White': '#f0f0f0',
  'GT Silver Metallic': '#d0d0d0',
  'Racing Yellow': '#ffd700',
  'Shark Blue': '#0055ff',
};

export const wheelTypes = ['Sport', 'Turbo', 'RS'];
export const interiorThemes = ['Black Leather', 'Red Leather', 'Beige Leather'];

export const useConfiguratorStore = create((set) => ({
  paintColor: porscheColors['GT Silver Metallic'],
  paintName: 'GT Silver Metallic',
  wheelType: 'Sport',
  interiorTheme: 'Black Leather',
  autoRotate: true,
  
  setPaintColor: (name) => set({ paintColor: porscheColors[name], paintName: name }),
  setWheelType: (type) => set({ wheelType: type }),
  setInteriorTheme: (theme) => set({ interiorTheme: theme }),
  setAutoRotate: (value) => set({ autoRotate: value }),
}));
