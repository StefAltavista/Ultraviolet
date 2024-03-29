import React, { useState, useEffect } from "react";

import { Range } from "react-range";
import { Direction } from "react-range";

export default function Slider(props) {
    const [state, setState] = useState({ values: [props.initValue || 0] });

    useEffect(() => {
        props.onSetValue(state.values[0]);
    }, [state]);

    return (
        <Range
            step={0.01}
            direction={Direction.Up}
            min={props.minValue || 0}
            max={props.maxValue}
            values={state.values}
            onChange={(values) => setState({ values })}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "200px",
                        width: "2px",
                        backgroundColor: "rgb(159, 124, 255)",
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "4px",
                        width: "20px",
                        backgroundColor: "#999",
                    }}
                />
            )}
        />
    );
}
