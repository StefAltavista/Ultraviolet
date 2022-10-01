import React, { useEffect, useState } from "react";

import * as Tone from "tone";
import { Filter } from "tone";
import Sequencer from "./Sequencer";

export default function Oscillations() {
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
    Tone.start();
    let synthGain = new Tone.Gain().connect(synth.detune);

    //effects
    let delay = new Tone.PingPongDelay({
        feedback: 0.1,
    });

    let filt = new Tone.Filter({
        frequency: 5000,
        Q: 0,
    });
    let filtGain = new Tone.Gain().connect(filt.frequency);

    let distortion1 = new Tone.Distortion(0);
    let distortion2 = new Tone.Distortion(0).toDestination();

    //connections
    synth.connect(distortion1);

    distortion1.connect(filt);

    filt.connect(delay);
    delay.connect(distortion2);

    //LFO
    const lfo = new Tone.LFO(50, 0, 100).start();

    let destination = "osc";
    const changeDestination = (destination) => {
        switch (destination) {
            case "osc":
                lfo.disconnect();
                lfo.connect(synthGain);

                break;
            case "filter":
                lfo.disconnect();
                lfo.connect(filtGain);

                break;
        }

        console.log(filtGain.input);
    };
    changeDestination(destination);

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
    function fltr(value) {
        filt.frequency.rampTo(parseFloat(value));
    }

    function fltrQ(value) {
        filt.Q.rampTo(parseFloat(value));
    }
    function lfoGain(value) {
        lfo.max = parseFloat(value);
    }
    function lfoFreq(value) {
        lfo.frequency.rampTo(parseFloat(value));
    }
    function dst1(value) {
        distortion1.distortion = value / 100;
    }
    function dst2(value) {
        distortion2.distortion = value / 100;
    }

    return (
        <>
            <button onClick={playSynth}>Start Sound</button>
            <button onClick={stopSynth}>Stop Sound</button>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                    <p>Frequency</p>
                    <input
                        type="range"
                        min={4}
                        max={3000}
                        defaultValue={100}
                        onChange={(e) => freq(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Lfo Freq</p>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        step={0.1}
                        onChange={(e) => lfoFreq(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Lfo Gain</p>
                    <input
                        type="range"
                        min={0}
                        max={1000}
                        step={0.1}
                        onChange={(e) => lfoGain(e.target.value)}
                    ></input>
                </div>
                <div>
                    <fieldset>
                        <legend>LFO Destination</legend>

                        <div>
                            <input
                                type="radio"
                                id="osc"
                                name="LFO"
                                value="osc"
                                checked
                                onClick={() => {
                                    changeDestination("osc");
                                }}
                            />
                            <label for="osc">Osc Frequency</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="filter"
                                name="LFO"
                                value="filter"
                                onClick={() => {
                                    changeDestination("filter");
                                }}
                            />
                            <label for="filter">Filter Frequency</label>
                        </div>
                    </fieldset>
                </div>
                <div>
                    <p>Distortion 1</p>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        defaultValue={0}
                        onChange={(e) => dst1(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Filter</p>
                    <input
                        type="range"
                        min={40}
                        max={5000}
                        defaultValue={5000}
                        onChange={(e) => fltr(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Resonance</p>
                    <input
                        type="range"
                        min={0}
                        max={60}
                        defaultValue={0}
                        onChange={(e) => fltrQ(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Distortion 2</p>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        defaultValue={0}
                        onChange={(e) => dst2(e.target.value)}
                    ></input>
                </div>
            </div>
            <Sequencer
                onChangeSequence={(newSeq) => changeSeq(newSeq)}
            ></Sequencer>
        </>
    );
}
