import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Face from "../graphics/Face";
import CloudWorld from "../graphics/CloudWorld";

import Synthesizer from "../tone/Synthesizer";

import { gsap } from "gsap";

export default function Home() {
    const titleRef = useRef();
    const subtitleRef = useRef();
    const toggle = (what) => {
        console.log(what);
    };

    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { duration: 2 } });
        timeline
            .from(titleRef.current, { y: "-100%" })
            .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1 });
    }, []);

    return (
        <div>
            <div id="header">
                <h1 id="title" ref={titleRef}>
                    U L T R A V I O L E T
                </h1>
                <p ref={subtitleRef}>Digital Industrial Synth</p>
            </div>
            {/* <button onClick={() => toggle("pinkworld")}>Pink World</button>
            <button onClick={() => toggle("face")}>Face</button>
            <button onClick={() => toggle("oscillations")}>Oscillations</button> */}

            <Synthesizer
                getOutput={(output) => console.log(output)}
            ></Synthesizer>
        </div>
    );
}
