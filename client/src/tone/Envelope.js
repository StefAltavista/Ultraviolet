import React, { useEffect, useState } from "react";
import Slider from "./Slider";

export default function Envelope({ getEnvelope }) {
    const env = ["attack", "decay", "sustain", "release"];
    const [envelope, setEnvelope] = useState({
        attack: 0,
        decay: 0.5,
        sustain: 0,
        release: 0.1,
    });

    useEffect(() => {
        getEnvelope(envelope);
    }, [envelope]);

    return (
        <div id="envelope" style={{ display: "flex", flexDirection: "row" }}>
            {env.map((x) => {
                return (
                    <div key={x}>
                        <p>{x}</p>
                        <Slider
                            onSetValue={(value) =>
                                setEnvelope({ ...envelope, [x]: value })
                            }
                            maxValue={1}
                        ></Slider>
                    </div>
                );
            })}
        </div>
    );
}
