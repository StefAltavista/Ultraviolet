import React from "react";
import { useEffect, useState } from "react";

export default function Sequencer() {
    const [steps, setSteps] = useState(8);
    const [sequence, setSequence] = useState([]);

    useEffect(() => {
        let arr = [...sequence];
        for (let i = 0; i < steps; i++) {
            arr[i] = false;
        }
        console.log(arr);
        setSequence(arr);
    }, []);

    const toggleStep = (index) => {
        let arr = [...sequence];
        arr[index] = !arr[index];
        setSequence(arr);
        console.log(arr);
    };
    const changeSteps = (sign) => {
        let arr = [...sequence];
        sign == "+"
            ? (arr.push(false), setSteps(steps + 1))
            : (arr.pop(), setSteps(steps - 1));
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
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100px",
                        }}
                    >
                        <div
                            key={idx}
                            style={{
                                border: "1px solid white",
                                margin: "5px",
                                width: "30px",
                                height: "30px",
                                backgroundColor: x ? "grey" : "black",
                                cursor: "pointer",
                            }}
                            onClick={() => toggleStep(idx)}
                        ></div>

                        <input
                            type="range"
                            style={{
                                transformOrigin: " 0% 0%",
                                transform: "translateX(420px)",
                                transform: "rotateZ(90deg) translateY(73px)",
                            }}
                        />
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
