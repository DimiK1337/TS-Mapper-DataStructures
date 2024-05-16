export const tuple = {
  small: {
    add: () => [
      (Math.random() * 10).toString(),
      `node`,
      Math.random() * 10,
      Math.random() * 10,
    ],
  },
  large: {
    add: () => [
      (Math.random() * 10).toString(),
      `node`,
      "d5bc89b2-74ea-4d1a-a0ed-22f4de79a580",
      "d4ae89b2-74ea-4d1a-a0ed-22f4de79a580",
      [[[["log normal"], [0.1640238, 0.4169375]]]],
      [[Math.random() * 10, Math.random() * 10], "icon"],
    ],
  },
};
