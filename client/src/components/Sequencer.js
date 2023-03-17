import React from "react";
import { useEffect, useState } from "react";

import Slider from "./Slider";

export default function Sequencer(props) {
    const [steps, setSteps] = useState(8);
    const [sequence, setSequence] = useState([]);

    useEffect(() => {
        let arr = [...sequence];
        for (let i = 0; i < steps; i++) {
            i == 0 ? (arr[i] = 100) : (arr[i] = 0);
        }
        props.onChangeSequence(arr);
        setSequence(arr);
    }, []);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < sequence.length; i++) {
            sequence[i] ? (arr[i] = sequence[i]) : (arr[i] = null);
        }
        props.onChangeSequence(arr);
    }, [sequence]);

    const toggleStep = (index) => {
        let arr = [...sequence];
        arr[index] = !arr[index] ? 1 : 0;
        setSequence(arr);
    };
    const changeSteps = (sign) => {
        let arr = [...sequence];
        sign == "+"
            ? (arr.push(0), setSteps(steps + 1))
            : (arr.pop(), setSteps(steps - 1));
        setSequence(arr);
    };
    const note = (n, idx) => {
        let arr = [...sequence];
        arr[idx] = n;
        setSequence(arr);
    };
    const gate = (gate) => {
        props.onChangeGate(gate);
    };
    return (
        <div id="sequencer">
            <div id="sequencerHead">
                {" "}
                <h3>Sequencer</h3>
                <div id="setSteps">
                    <p>Steps: {steps}</p>
                    <div style={button} onClick={() => changeSteps("+")}>
                        +
                    </div>
                    <div style={button} onClick={() => changeSteps("-")}>
                        -
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div id="steps">
                        <div id="gate">
                            <p>Gate</p>
                            <Slider
                                onSetValue={(value) => gate(value)}
                                maxValue={1}
                                initValue={0.5}
                            />
                        </div>
                        {sequence.map((x, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        border: "1px solid white",
                                        margin: "10px",
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: x ? "grey" : "black",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => toggleStep(idx)}
                                ></div>
                                <Slider
                                    onSetValue={(value) => note(value, idx)}
                                    maxValue={500}
                                    initValue={idx == 0 ? 100 : 0}
                                />
                            </div>
                        ))}{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}

const button = {
    margin: "5px",
    width: "20px",
    height: "20px",
    backgroundColor: "blueviolet",
    cursor: "pointer",
    textAlign: "center",
};
