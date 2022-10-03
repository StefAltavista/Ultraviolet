import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Face from "../graphics/Face";
import CloudWorld from "../graphics/CloudWorld";

import { gsap } from "gsap";

export default function Header() {
    const titleRef = useRef();
    const subtitleRef = useRef();

    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { duration: 2 } });
        timeline
            .from(titleRef.current, { y: "-100%" })
            .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1 });
    }, []);

    return (
        <div id="title">
            <h1 id="title" ref={titleRef}>
                U L T R A V I O L E T
            </h1>
            <p ref={subtitleRef}>Digital Industrial Synth</p>
            <div id="line"></div>
        </div>
    );
}
