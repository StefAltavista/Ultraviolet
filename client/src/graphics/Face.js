import React from "react";
import { useEffect } from "react";
import * as p5 from "p5";

let width = 400;
let height = 400;
let lgt = 3;
let w = width / lgt;
let h = height / lgt;
let x = 0;
let y = 0;
let face;

export default function Face() {
    window.addEventListener("mousemove", (e) => {
        x = e.offsetX / 200 + 100;
        y = e.offsetY / 200 + 100;
    });
    const Sketch = (p5) => {
        p5.preload = () => {
            face = p5.loadImage("../../image_resources/face.png");
        };
        p5.setup = () => {
            p5.frameRate(15);
            p5.createCanvas(width, height, p5.WEBGL);
        };

        p5.draw = () => {
            p5.rotateY(1 + x);
            p5.rotateX(1 + y);
            createFace(p5);
            // p5.noLoop();
        };
    };

    useEffect(() => {
        new p5(Sketch);
    }, []);

    return <></>;
}

const createFace = (p5) => {
    p5.background(255, 255, 255);
    // x -= 0.05;
    let z = [];
    let c;
    face.loadPixels();
    for (let i = 0; i < w; i++) {
        z[i] = [];
        for (let j = 0; j < h; j++) {
            c = face.get(i * lgt, j * lgt)[0];
            c < 20 ? (c = -200) : (c = c);
            z[i][j] = c;
        }
    }

    p5.translate(-width / 2, -height / 2);
    p5.strokeWeight(0.9);
    for (let j = 0; j < h - 1; j++) {
        p5.beginShape("TRIANGLE_STRIP");

        for (let i = 0; i < w - 1; i++) {
            z[i][j] == -200
                ? null
                : p5.vertex(i * lgt, j * lgt, z[i][j] * 0.25);
        }
        p5.endShape();
    }
};
