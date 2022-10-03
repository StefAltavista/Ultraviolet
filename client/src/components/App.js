import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Synthesizer from "./Synthesizer";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Synthesizer />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
