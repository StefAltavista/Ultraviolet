import React, { useEffect, useState, useMemo } from "react";

import * as Tone from "tone";
import Sequencer from "./Sequencer";

import Effects from "./Effects";
import Oscillator from "./Oscillator";
let sequence = [null];
let osc;

export default function Synthesizer() {
    const [fxChain, setFxChain] = useState(["Filter"]);
    const [synth, setSynth] = useState(null);

    //OSCILLATOR
    useEffect(() => {
        setSynth(osc);
        console.log("useState");
    }, []);

    const setOscillator = (o) => {
        osc = o;
        console.log("osc", osc, o);
    };

    let output = new Tone.Gain().toDestination();
    output.gain.rampTo(0.7);

    //SEQUENCER
    let seq = new Tone.Sequence(
        (time, freq) => {
            synth.triggerAttack(freq, time, Math.random() * 0.5 + 0.5);
            // adsr.triggerAttackRelease(0.5);
        },
        sequence,
        "8n"
    ).start(0);

    const changeSeq = (newSeq) => {
        sequence = newSeq;
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

    return (
        <>
            <button onClick={playSynth}>Start Sound</button>
            <button onClick={stopSynth}>Stop Sound</button>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Oscillator
                    getOscillator={(osc) => setOscillator(osc)}
                ></Oscillator>

                {synth ? (
                    <Effects synth={synth} output={output}></Effects>
                ) : null}
            </div>

            <Sequencer
                onChangeSequence={(newSeq) => changeSeq(newSeq)}
            ></Sequencer>
        </>
    );
}
