import React, { useEffect, useState, useMemo } from "react";

import * as Tone from "tone";
import Sequencer from "./Sequencer";

import Effects from "./Effects";
import Oscillator from "./Oscillator";
import Envelope from "./Envelope";

let sequence = [null];
let osc;
let envelope;
let synthGain;
let gate;
let bpm = 66;

export default function Synthesizer() {
    // const [fxChain, setFxChain] = useState(["Filter"]);
    const [oscillator, setOscillator] = useState(null);

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
    let output = new Tone.Gain().toDestination();
    output.gain.rampTo(0.7);

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
        <>
            <div
                id="controls"
                style={{ display: "flex", flexDirection: "row" }}
            >
                <button onClick={playSynth}>Start Sound</button>
                <button onClick={stopSynth}>Stop Sound</button>

                <p>BPM:</p>
                <input
                    type="number"
                    defaultValue={bpm}
                    max={1000}
                    onChange={(e) => setBpm(e.target.value)}
                ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Oscillator
                    getOscillator={(osc) => setOsc(osc)}
                    tweek={(values) => {
                        oscillator[values.param].linearRampToValueAtTime(
                            values.value,
                            Tone.now() + 0.1
                        );
                    }}
                ></Oscillator>
            </div>
            <Envelope
                getEnvelope={(ampEnv) => {
                    setEnvelope(ampEnv);
                }}
                tweekEnvelope={(newADSR) => {
                    changeADSR(newADSR);
                }}
                maxValue={1}
            ></Envelope>
            <Sequencer
                onChangeSequence={(newSeq) => changeSeq(newSeq)}
                onChangeGate={(newGate) => {
                    gate = newGate;
                }}
                max={500}
            ></Sequencer>
            {oscillator ? (
                <Effects oscillator={oscillator} output={output}></Effects>
            ) : null}
        </>
    );
}
