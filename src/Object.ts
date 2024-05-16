export const object = {
  small: {
    add: () => ({
      id: (Math.random() * 10).toString(),
      name: `node`,
      x: Math.random() * 10,
      y: Math.random() * 10,
    }),
  },
  large: {
    add: () => ({
      id: (Math.random() * 10).toString(),
      name: `node`,
      incoming: "d5bc89b2-74ea-4d1a-a0ed-22f4de79a580",
      outgoing: "d4ae89b2-74ea-4d1a-a0ed-22f4de79a580",
      metadata: [
        {
          duration: {
            distribution: "log normal",
            parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
          },
        },
      ],
      ui: {
        coordinates: {
          x: Math.random() * 10,
          y: Math.random() * 10,
        },
        icon: "icon",
      },
    }),
  },
};
