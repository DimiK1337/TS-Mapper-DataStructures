let initObjects = () => {
    // Object
    let actor = {
        id: "35c6779a-fd9d-4036-b1ab-af0b932fc903",
        name: "Start",
    };
    // Array of Objects
    let pathway = [actor];
};
// Example of a complete actor with all attributes
let maximum_object = {
    id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
    name: "Triage",
    coordinates: { x: 0, y: 0 },
    icon: "🏥", // SVG 
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
};
// Example of a complete actor with only attributes required by D3 to plot it
let minimum_object = {
    id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
    x: 0,
    y: 0,
    icon: "🏥", // SVG 
};
export {};
