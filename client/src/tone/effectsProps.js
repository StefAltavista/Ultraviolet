const effectsProps = {
    Filter: {
        eName: "Filter",
        parameters: [
            {
                param: "frequency",
                valueInit: 5000,
                maxValue: 5000,
                step: 1,

                paramRamp: true,
            },
            {
                param: "Q",
                valueInit: 0,
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
                valueInit: 0,
                maxValue: 1,
                step: 0.01,
                paramRamp: true,
            },
            {
                param: "feedback",
                valueInit: 0,
                maxValue: 1,
                step: 0.01,
                paramRamp: true,
            },
        ],
    },

    Distortion: {
        eName: "Distortion",
        parameters: [
            {
                param: "distortion",
                valueInit: 0,
                maxValue: 5,
                step: 0.1,
                paramRamp: false,
            },
        ],
    },
};
export default effectsProps;
