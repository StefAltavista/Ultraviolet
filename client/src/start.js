import React from "react";
import * as ReactDOMClient from "react-dom/client";

import Synthesizer from "./components/Synthesizer";
import NoSafari from "./components/NoSafari";
import { browserName, isMobile } from "react-device-detect";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
const app =
    browserName == "Safari" && !isMobile ? <NoSafari /> : <Synthesizer />;
root.render(app);
