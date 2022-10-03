import React from "react";
import * as Tone from "tone";
let bpm = 100;
export default function Controls() {
    const playSynth = () => {
        Tone.Transport.start();
        Tone.start();
    };
    const stopSynth = () => {
        Tone.Transport.stop();
    };

    const setBpm = (bpm) => {
        Tone.Transport.bpm.value = bpm;
    };
    setBpm(bpm);
    return (
        <div id="controls">
            <div id="seqSettings">
                <button onClick={playSynth}>Play</button>
                <button onClick={stopSynth}>Stop</button>

                <p>BPM:</p>
                <input
                    type="number"
                    defaultValue={bpm}
                    max={1000}
                    onChange={(e) => setBpm(e.target.value)}
                ></input>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {" "}
                    <p>Volume</p>
                    <input
                        type="range"
                        defaultValue={0.7}
                        step={0.01}
                        max={1}
                        onChange={(e) => {
                            vol = -(e.target.value * 1);
                            output.gain.rampTo(vol);
                        }}
                    ></input>
                </div>
            </div>
        </div>
    );
}
