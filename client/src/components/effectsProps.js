const effectsProps = {
    Filter: {
        eName: "Filter",
        parameters: [
            {
                param: "frequency",
                valueInit: 5000,
                maxValue: 10000,
                step: 1,

                paramRamp: true,
            },
            {
                param: "Q",
                valueInit: 45,
                maxValue: 60,
                step: 1,
                paramRamp: true,
            },
        ],
    },
    PingPongDelay: {
        eName: "PingPongDelay",
        parameters: [
            {
                param: "delayTime",
                valueInit: 0.05,
                maxValue: 1,
                step: 0.01,
                paramRamp: true,
            },
            {
                param: "feedback",
                valueInit: 0.5,
                maxValue: 1,
                step: 0.01,
                paramRamp: true,
            },
        ],
    },
    // Reverb: {
    //     eName: "Reverb",
    //     parameters: [
    //         {
    //             param: "decay",
    //             valueInit: 0.2,
    //             maxValue: 5,
    //             step: 0.1,
    //             paramRamp: true,
    //         },
    //     ],
    // },
    Distortion: {
        eName: "Distortion",
        parameters: [
            {
                param: "distortion",
                valueInit: 2,
                maxValue: 5,
                step: 0.1,
                paramRamp: false,
            },
        ],
    },
};
export default effectsProps;
