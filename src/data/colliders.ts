export type BoxCollider = {
  position: [number, number, number];
  size: [number, number, number];
};

export const staticColliders: BoxCollider[] = [
  ...[-12, -6, 0, 6, 12].map((x) => ({
    position: [x, 0.2, 4.5] as [number, number, number],
    size: [0.3, 0.6, 0.3] as [number, number, number],
  })),

  { position: [-13, 2, -4.5], size: [0.8, 4, 0.8] },
  { position: [13, 2, 4.5], size: [0.8, 4, 0.8] },

  { position: [-15, -2, -8], size: [4, 6, 4] },
  { position: [15, -2, -8], size: [5, 4, 5] },
  { position: [0, -2, -12], size: [3, 8, 3] },

  { position: [-15, 1.2, -8], size: [4.5, 0.4, 4.5] },
  { position: [15, 0.2, -8], size: [5.5, 0.4, 5.5] },
  { position: [0, 2.2, -12], size: [3.5, 0.4, 3.5] },
];
