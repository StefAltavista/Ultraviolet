const effectsProps = {
    Filter: {
        eName: "Filter",
        parameters: [
            { param: "frequency", maxValue: 5000, step: 1, paramRamp: true },
            { param: "Q", maxValue: 60, step: 1, paramRamp: true },
        ],
    },
    PingPongDelay: {
        eName: "PingPongDelay",
        parameters: [
            { param: "delayTime", maxValue: 1, step: 0.01, paramRamp: true },
            { param: "feedback", maxValue: 1, step: 0.01, paramRamp: true },
        ],
    },

    Distortion: {
        eName: "Distortion",
        parameters: [
            { param: "distortion", maxValue: 5, step: 0.1, paramRamp: false },
        ],
    },
};
export default effectsProps;
