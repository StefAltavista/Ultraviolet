import React, { useEffect, useState } from "react";
import Header from "./Header";
import * as Tone from "tone";
import Controls from "./Controls";
import Sequencer from "./Sequencer";
import Effects from "./Effects";
import Oscillator from "./Oscillator";
import Envelope from "./Envelope";

let vol = 0.7;
let sequence;
let osc;

// let envelope;
let env = {
    attack: 0.1,
    decay: 0.5,
    sustain: 0.1,
    release: 0.5,
};
let envelope = new Tone.Envelope(env);

let synthGain;
let gate;

export default function Synthesizer() {
    const [oscillator, setOscillator] = useState(null);
    let output = new Tone.Gain().toDestination();
    output.gain.rampTo(vol);

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

    Envelope;
    const setEnvelope = (ampEnv) => {
        envelope = ampEnv;
    };
    const changeADSR = (newADSR) => {
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
            // oscillator.frequency.rampTo(freq);
            envelope.triggerAttackRelease(time);
            envelope.triggerRelease("+" + gate);
        },
        sequence,
        "16n"
    ).start(0);

    const changeSeq = (newSeq) => {
        sequence = newSeq;
        seq.set({ events: newSeq });
    };

    return (
        <div>
            <div id="header">
                <Header></Header>
                <Controls></Controls>
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
