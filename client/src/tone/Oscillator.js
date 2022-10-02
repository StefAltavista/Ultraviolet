import React, { useEffect } from "react";
import * as Tone from "tone";

export default function Oscillator({ getOscillator }) {
    let synth = new Tone.FMSynth({
        modulationIndex: 20,
        frequency: 60,
        envelope: {
            attack: 0.5,
            decay: 11,
            sustain: 0,
            release: 2,
        },
    });
    let synthGain = new Tone.Gain().connect(synth.detune);
    //LFO
    let lfo = new Tone.LFO(50, 0, 100).start();
    lfo.connect(synthGain);

    getOscillator(synth);

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
    );
}
