import { actor, pathway } from "./Types.js";

let initTuples = () => {
  // Tuple
  let actor: actor = ["35c6779a-fd9d-4036-b1ab-af0b932fc903", "Start"];

  // Array of Tuples
  let pathway: pathway = [actor];
};

// Example of a complete actor with all attributes
let maximum_tuple = [
  "15b6679a-fd9d-4036-b1ab-af0b932fc903",
  "Triage",
  [0,0],
  "🏥", 
  "d5bc89b2-74ea-4d1a-a0ed-22f4de79a580",
  "d4ae89b2-74ea-4d1a-a0ed-22f4de79a580", 
  [
    [
      [
        "log normal", 
        [0.1640238, 0.4169375]
      ]
    ]
  ]
];
// Example of a complete actor with only attributes required by D3 to plot it
let minimum_tuple = [
  "15b6679a-fd9d-4036-b1ab-af0b932fc903",
  0,
  0,
  "🏥"
];