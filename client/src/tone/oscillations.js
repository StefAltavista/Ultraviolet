import React, { useEffect, useState } from "react";

import * as Tone from "tone";
import Sequencer from "./Sequencer";

export default function Oscillations() {
    const synth = new Tone.FMSynth({
        modulationIndex: 20,
        frequency: 60,
        envelope: {
            attack: 0,
            decay: 0.3,
            sustain: 0,
            release: 0,
        },
    });
    Tone.start();

    //effects
    let delay = new Tone.PingPongDelay({
        feedback: 0.1,
    });
    let phaser = new Tone.Phaser();
    let filt = new Tone.AutoFilter({
        frequency: 0,
        baseFrequency: 5000,
        octaves: 1,
    });
    let distortion1 = new Tone.Distortion(0);
    let distortion2 = new Tone.Distortion(0).toDestination();

    //connections
    synth.connect(phaser);
    phaser.connect(distortion1);
    distortion1.connect(filt);

    filt.connect(distortion2);
    delay.connect(distortion2);

    //LFO

    //sequencer

    let initialSeq = [null, null, null, 100];
    let seq = new Tone.Sequence(
        (time, freq) => {
            synth.triggerAttack(freq, time, Math.random() * 0.5 + 0.5);
        },
        initialSeq,
        "16n"
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
        synth.detune.rampTo(parseFloat(value), 0.5);
    }
    function fltr(value) {
        filt.baseFrequency = value;
    }
    function phs(value) {
        phaser.frequency.rampTo(parseFloat(value), 0.5);
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
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Frequency</p>
                <input
                    type="range"
                    min={4}
                    max={3000}
                    defaultValue={100}
                    onChange={(e) => freq(e.target.value)}
                ></input>
                <p>Phase Freq</p>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    onChange={(e) => phs(e.target.value)}
                ></input>
                <p>Distortion 1</p>
                <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={0}
                    onChange={(e) => dst1(e.target.value)}
                ></input>
                <p>Filter</p>
                <input
                    type="range"
                    min={40}
                    max={5000}
                    defaultValue={5000}
                    onChange={(e) => fltr(e.target.value)}
                ></input>
                <p>Distortion 2</p>
                <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={0}
                    onChange={(e) => dst2(e.target.value)}
                ></input>
            </div>
            <Sequencer
                onChangeSequence={(newSeq) => changeSeq(newSeq)}
            ></Sequencer>
        </>
    );
}
