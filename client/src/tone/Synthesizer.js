import React, { useEffect, useState, useMemo } from "react";

import * as Tone from "tone";
import Sequencer from "./Sequencer";

import Effects from "./Effects";
import Oscillator from "./Oscillator";
import Envelope from "./Envelope";

let vol = 0.7;
let sequence = [null];
let osc;
let envelope;
let synthGain;
let gate;
let bpm = 66;

export default function Synthesizer({ getOutput }) {
    const [oscillator, setOscillator] = useState(null);
    let output = new Tone.Gain().toDestination();
    output.gain.rampTo(vol);
    getOutput(output);

    //OSCILLATOR
    const setOsc = (o) => {
        osc = o;
    };
    useEffect(() => {
        setOscillator(osc);
    }, []);
    useEffect(() => {
        if (oscillator) {
            synthGain = new Tone.Gain(1).connect(oscillator.volume);
            envelope.connect(synthGain);
        }
    }, [oscillator]);

    //Envelope
    const setEnvelope = (ampEnv) => {
        envelope = ampEnv;
        console.log("set:", envelope);
    };
    const changeADSR = (newADSR) => {
        console.log("changeAdsR");
        envelope.set({
            attack: newADSR.attack,
            decay: newADSR.decay,
            sustain: newADSR.sustain,
            release: newADSR.release,
        });
    };

    //SEQUENCER
    let seq = new Tone.Sequence(
        (time, freq) => {
            oscillator.set({ frequency: freq });
            envelope.triggerAttackRelease(time);
            envelope.triggerRelease("+" + gate);
        },
        sequence,
        "8n"
    ).start(0);

    const changeSeq = (newSeq) => {
        sequence = newSeq;
        seq.set({ events: newSeq });
    };

    //controlls

    const playSynth = () => {
        // oscillator.start();
        Tone.Transport.start();
    };
    const stopSynth = () => {
        Tone.Transport.stop();
        // oscillator.stop();
    };

    const setBpm = (bpm) => {
        Tone.Transport.bpm.value = bpm;
    };

    return (
        <div>
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
            <div id="synth">
                <Oscillator
                    getOscillator={(osc) => setOsc(osc)}
                    tweek={(values) => {
                        oscillator[values.param].linearRampToValueAtTime(
                            values.value,
                            Tone.now() + 0.1
                        );
                    }}
                ></Oscillator>

                <Envelope
                    getEnvelope={(ampEnv) => {
                        setEnvelope(ampEnv);
                    }}
                    tweekEnvelope={(newADSR) => {
                        changeADSR(newADSR);
                    }}
                    maxValue={1}
                ></Envelope>
                <div id="runSeq">
                    <Sequencer
                        onChangeSequence={(newSeq) => changeSeq(newSeq)}
                        onChangeGate={(newGate) => {
                            gate = newGate;
                        }}
                        max={500}
                    ></Sequencer>
                </div>
            </div>
            {oscillator ? (
                <Effects oscillator={oscillator} output={output}></Effects>
            ) : null}
        </div>
    );
}
