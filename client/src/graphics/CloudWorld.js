import React from "react";
import { useEffect } from "react";
import * as p5 from "p5";
let width = 600;
let height = 600;
let lgt = 20;
let w = width / lgt;
let h = height / lgt;
let flying = 0;
export default function CloudWorld() {
    const Sketch = (p5) => {
        p5.setup = () => {
            p5.frameRate(15);
            p5.createCanvas(width, height, p5.WEBGL);
        };

        p5.draw = () => {
            // p5.noLoop();
            p5.background(255, 255, 255);
            flying -= 0.05;
            let z = [];
            let t = 30;
            for (let i = 0; i < w; i++) {
                z[i] = [];
                for (let j = 0; j < h; j++) {
                    z[i][j] = p5.noise(i / t, j / t + flying);
                }
            }
            p5.rotateX(1);
            // p5.rotateY(0.01 * flying);
            // p5.rotateZ(0.01 * flying);
            p5.translate(-width / 2, -height / 2);
            p5.strokeWeight(10);
            for (let j = 0; j < h - 1; j++) {
                // p5.beginShape("TRIANGLE_STRIP");

                for (let i = 0; i < w - 1; i++) {
                    p5.stroke(z[i][j] * 255, z[i + 1][j] / 255, 255);
                    // p5.fill(z[i][j] * 255, z[i + 1][j] / 255, 255);

                    p5.point(i * lgt, j * lgt, z[i][j] * 100);
                    // p5.vertex(i * lgt, j * lgt, z[i][j] * 200);
                    // p5.vertex(i * lgt, (j + 1) * lgt, z[i][j] * 200);
                    // p5.vertex(i * lgt + lgt, j * lgt + lgt, z[i][j]);
                }
                // p5.endShape();
            }
        };
    };

    useEffect(() => {
        new p5(Sketch);
    }, []);

    return <></>;
}
