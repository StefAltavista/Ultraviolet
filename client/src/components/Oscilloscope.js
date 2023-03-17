import * as p5 from "p5";
import * as Tone from "tone";
import React, { useRef, useEffect } from "react";

// create a new p5 sketch

export default function Oscilloscope({ output }) {
    let waveform;
    const scope = new Tone.Waveform();
    output.connect(scope);
    const canvas = useRef();
    const Sketch = (p5) => {
        p5.setup = () => {
            p5.frameRate(30);
            p5.createCanvas(300, 80);
        };

        p5.draw = () => {
            p5.background(255, 166, 0);

            waveform = scope.getValue();
            p5.beginShape();
            for (let i = 0; i < waveform.length; i++) {
                p5.stroke(255, 166, 0);
                p5.fill(130, 0, 130);
                const x = p5.map(i, 0, waveform.length, 0, p5.width);
                const y = p5.map(waveform[i], -1, 1, p5.height, 0);
                p5.vertex(x, y);
            }
            p5.endShape();
        };
    };
    useEffect(() => {
        const myP5 = new p5(Sketch, canvas.current);
    }, []);
    return <div ref={canvas}></div>;
}
