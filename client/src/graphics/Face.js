import React from "react";
import { useEffect } from "react";
import * as p5 from "p5";
let width = 300;
let height = 300;
let lgt = 2;
let w = width / lgt;
let h = height / lgt;
let flying = 0;
let face;
export default function CloudWorld() {
    const Sketch = (p5) => {
        p5.preload = () => {
            face = p5.loadImage("../../image_resources/face.png");
        };
        p5.setup = () => {
            p5.frameRate(15);
            p5.createCanvas(width, height, p5.WEBGL);
            // for (let i = 0; i < face.width; i++) {
            //     for (let j = 0; j < face.height; j++) {
            //         let c = face.get(i, j)[0];
            //         console.log(c);
            //     }
            // }
        };

        p5.draw = () => {
            // face.resize(width, height);
            // p5.image(face, -width / 2, -height / 2, width, height);
            cloud(p5);
            p5.noLoop();
        };
    };

    useEffect(() => {
        new p5(Sketch);
    }, []);

    return <></>;
}

const cloud = (p5) => {
    p5.background(255, 255, 255);
    flying -= 0.05;
    let z = [];
    let t = 30;
    let c;

    face.loadPixels();
    for (let i = 0; i < w; i++) {
        z[i] = [];
        for (let j = 0; j < h; j++) {
            // z[i][j] = p5.noise(i / t, j / t + flying);
            // console.log(face.get(i * lgt, j * lgt));
            c = face.get(i * lgt, j * lgt)[0];
            c < 20 ? (c = -200) : (c = c);
            z[i][j] = c;
        }
    }
    p5.rotateX(18);
    // p5.rotateY(0.01 * flying);
    // p5.rotateZ(0.01 * flying);
    p5.translate(-width / 2, -height / 2);
    p5.strokeWeight(0.9);
    for (let j = 0; j < h - 1; j++) {
        p5.beginShape("TRIANGLE_STRIP");

        for (let i = 0; i < w - 1; i++) {
            // p5.stroke(z[i][j] * 255, z[i + 1][j] / 255, 255);
            // p5.fill(z[i][j] * 255, z[i + 1][j] / 255, 255);

            // p5.point(i * lgt, j * lgt, z[i][j] * 0.2);
            z[i][j] == -200
                ? null
                : p5.vertex(i * lgt, j * lgt, z[i][j] * 0.25);
            // p5.vertex(i * lgt, (j + 1) * lgt, z[i][j] * 200);
            // p5.vertex(i * lgt + lgt, j * lgt + lgt, z[i][j]);
        }
        p5.endShape();
    }
};
