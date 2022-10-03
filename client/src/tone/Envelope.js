import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import Slider from "./Slider";

export default function Envelope({ tweekEnvelope, getEnvelope }) {
    let envelope = {
        attack: 0.1,
        decay: 0.5,
        sustain: 0,
        release: 0,
    };
    let ampEnv = new Tone.Envelope(envelope);
    getEnvelope(ampEnv);

    return (
        <div id="envelope">
            <h3>Amp EG</h3>
            <div id="adsr">
                {Object.keys(envelope).map((x) => {
                    return (
                        <div id="stage" key={x[0]}>
                            <Slider
                                onSetValue={(value) => {
                                    envelope = { ...envelope, [x]: value };
                                    tweekEnvelope(envelope);
                                }}
                                maxValue={1}
                                minValue={x == "decay" ? 0.001 : 0}
                                initValue={envelope[x]}
                            ></Slider>
                            <p>{x}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
