export declare const map: {
    pathway: {
        id: string;
        name: string;
        start: {
            id: string;
            name: string;
            outgoing: string;
            metadata: {
                arrival: {
                    distribution: string;
                    parameters: {
                        rate: number;
                    }[];
                };
            }[];
        };
        workflow: ({
            id: string;
            name: string;
            incoming: string;
            outgoing: string;
            metadata: {
                duration: {
                    distribution: string;
                    parameters: ({
                        meanlog: number;
                        sdlog?: undefined;
                    } | {
                        sdlog: number;
                        meanlog?: undefined;
                    })[];
                };
            }[];
        } | {
            id: string;
            name: string;
            incoming: string;
            outgoing: string;
            metadata: {
                duration: {
                    distribution: string;
                    parameters: {
                        rate: number;
                    }[];
                };
            }[];
        })[];
        decision: ({
            id: string;
            name: string;
            direction: string;
            incoming: string;
            outgoing: string[];
            metadata: {
                prevalence: {
                    target: string;
                    probability: number;
                }[];
            }[];
        } | {
            id: string;
            name: string;
            direction: string;
            incoming: string[];
            outgoing: string;
            metadata?: undefined;
        })[];
        delay: {
            id: string;
            name: string;
            incoming: string;
            outgoing: string;
        }[];
        end: {
            id: string;
            name: string;
            incoming: string;
        }[];
        path: {
            id: string;
            name: string;
            source: string;
            target: string;
        }[];
    };
};
