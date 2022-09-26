import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CloudWorld from "../graphics/CloudWorld";

import { gsap } from "gsap";

export default function Home() {
    const titleRef = useRef();
    const subtitleRef = useRef();
    const cloudRef = useRef();

    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { duration: 2 } });
        timeline
            .fromTo(titleRef.current, { x: "-50%" }, { x: "0%" })
            .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1 });
    }, []);

    return (
        <>
            <h1 class="title" ref={titleRef}>
                Superface
            </h1>
            <p ref={subtitleRef}>Exteriorities and Deep Superficialities</p>

            <CloudWorld />
        </>
    );
}
