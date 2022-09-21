import React from "react";
import * as ReactDOMClient from "react-dom/client";

// import { ReactDOM } from "react-dom";
import App from "./components/App";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
