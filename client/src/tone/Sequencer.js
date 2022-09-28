import React from "react";
import { useEffect, useState, useRef } from "react";

import Slider from "./Slider";

export default function Sequencer(props) {
    const [steps, setSteps] = useState(8);
    const [sequence, setSequence] = useState([]);

    useEffect(() => {
        let arr = [...sequence];
        for (let i = 0; i < steps; i++) {
            arr[i] = 0;
        }

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
        arr[index] = !arr[index] ? 50 : 0;
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
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <p>Steps: {steps}</p>
                <div style={button} onClick={() => changeSteps("+")}>
                    +
                </div>
                <div style={button} onClick={() => changeSteps("-")}>
                    -
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
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
                                width: "30px",
                                height: "30px",
                                backgroundColor: x ? "grey" : "black",
                                cursor: "pointer",
                            }}
                            onClick={() => toggleStep(idx)}
                        ></div>
                        <Slider onSetNote={(value) => note(value, idx)} />
                    </div>
                ))}
            </div>
        </>
    );
}

const button = {
    margin: "5px",
    width: "15px",
    height: "15px",
    backgroundColor: "grey",
    cursor: "pointer",
    textAlign: "center",
};
