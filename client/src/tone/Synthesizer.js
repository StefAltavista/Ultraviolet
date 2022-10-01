import React, { useEffect, useState } from "react";

import * as Tone from "tone";
import Sequencer from "./Sequencer";
import Effects from "./Effects";
import effectsProps from "./effectsProps";
import { PingPongDelay } from "tone";

export default function Synthesizer() {
    const [fxChain, setFxChain] = useState([
        "Filter",
        "PingPongDelay",
        "Distortion",
        "PingPongDelay",
    ]);

    const synth = new Tone.FMSynth({
        modulationIndex: 20,
        frequency: 60,
        envelope: {
            attack: 0,
            decay: 1,
            sustain: 0,
            release: 2,
        },
    });
    let synthGain = new Tone.Gain().connect(synth.detune);
    let output = new Tone.Gain().toDestination();
    output.gain.rampTo(0.7);

    //EFFECTS
    let effects = [];
    const getFx = (fx) => {
        effects = [...effects, fx];
    };
    const tweek = (orden, value, param, paramRamp) => {
        effects[orden].tweek(value, param, paramRamp);
    };

    useEffect(() => {
        for (let i = 0; i < fxChain.length; i++) {
            if (i == 0) {
                synth.connect(effects[i].effect);
            }
            if (i == fxChain.length - 1) {
                effects[i].effect.connect(output);
                break;
            } else {
                effects[i].effect.connect(effects[i + 1].effect);
            }
        }
    }, [fxChain]);

    //LFO
    const lfo = new Tone.LFO(50, 0, 100).start();
    lfo.connect(synthGain);

    // Extra ADSR
    // const adsr = new Tone.Envelope({
    //     attack: 0,
    //     decay: 0.4,
    //     sustain: 0.6,
    //     release: 0.5,
    // });
    // let adsrGain = new Tone.Gain().connect(filtGain);
    // adsrGain.set({ gain: 10000 });
    // adsr.connect(adsrGain);
    //sequencer

    let seq = new Tone.Sequence(
        (time, freq) => {
            synth.triggerAttack(freq, time, Math.random() * 0.5 + 0.5);
            // adsr.triggerAttackRelease(0.5);
        },
        [null],
        "8n"
    ).start(0);

    const changeSeq = (newSeq) => {
        seq.set({ events: newSeq });
    };

    //controlls

    function playSynth() {
        // synth.start();
        Tone.Transport.start();
    }
    function stopSynth() {
        Tone.Transport.stop();
        // synth.stop();
    }

    function freq(value) {
        synth.detune.rampTo(parseFloat(value));
    }

    function lfoGain(value) {
        lfo.max = parseFloat(value);
    }
    function lfoFreq(value) {
        lfo.frequency.rampTo(parseFloat(value));
    }

    return (
        <>
            <button onClick={playSynth}>Start Sound</button>
            <button onClick={stopSynth}>Stop Sound</button>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                    <h3>Oscillator</h3>
                    <p>Frequency</p>
                    <input
                        type="range"
                        min={4}
                        max={3000}
                        defaultValue={100}
                        onChange={(e) => freq(e.target.value)}
                    ></input>

                    <p>Lfo Freq</p>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        step={0.1}
                        onChange={(e) => lfoFreq(e.target.value)}
                    ></input>

                    <p>Lfo Gain</p>
                    <input
                        type="range"
                        min={0}
                        max={1000}
                        step={0.1}
                        onChange={(e) => lfoGain(e.target.value)}
                    ></input>
                </div>

                {fxChain.map((fx, i) => {
                    return (
                        <Effects
                            key={i}
                            orden={i}
                            eName={effectsProps[fx].eName}
                            parameters={effectsProps[fx].parameters}
                            FX={(fx) => getFx(fx)}
                            tweekFX={(orden, value, param, paramRamp) =>
                                tweek(orden, value, param, paramRamp)
                            }
                        ></Effects>
                    );
                })}
            </div>
            <Sequencer
                onChangeSequence={(newSeq) => changeSeq(newSeq)}
            ></Sequencer>
        </>
    );
}
