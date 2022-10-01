import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Face from "../graphics/Face";
import CloudWorld from "../graphics/CloudWorld";
import Oscillations from "../tone/oscillations";

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
            .fromTo(titleRef.current, { x: "-50%" }, { x: "20%" })
            .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1 });
    }, []);

    return (
        <div
            style={{ backgroundColor: "black", color: "red", height: "100vw" }}
        >
            <h1 ref={titleRef}>U L T R A V I O L E T</h1>
            {/* <p ref={subtitleRef}>Exteriorities and Deep Superficialities</p> */}
            <p ref={subtitleRef}>Digital Industrial Synth</p>

            {/* <button onClick={() => toggle("pinkworld")}>Pink World</button>
            <button onClick={() => toggle("face")}>Face</button>
            <button onClick={() => toggle("oscillations")}>Oscillations</button> */}

            <Oscillations></Oscillations>
        </div>
    );
}
