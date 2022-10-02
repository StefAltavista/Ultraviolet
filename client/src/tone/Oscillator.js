import React, { useEffect } from "react";
import * as Tone from "tone";
import Envelope from "./Envelope";

export default function Oscillator({ getOscillator }) {
    let synth = new Tone.FMSynth({
        modulationIndex: 20,
        frequency: 60,
        envelope: { attack: 20, decay: 10, sustain: 0, release: 10 },
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
    function changeADSR(newADSR) {
        synth.envelope.attack = newADSR.attack;
        // synth.envelope.decay = newADSR.decay;
        // synth.envelope.rampTo({ ...newADSR });
        // synth.set();
        console.log(synth.set);
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
            <Envelope
                getEnvelope={(newADSR) => {
                    changeADSR(newADSR);
                }}
                maxValue={1}
            ></Envelope>
        </div>
    );
}
