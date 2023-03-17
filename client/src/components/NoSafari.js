import React from "react";
import Header from "./Header";

export default function NoSafari() {
    return (
        <>
            <Header />
            <div
                style={{
                    height: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "orange",
                }}
            >
                <h2>Dear visitor, why are you using safari? </h2>
                <h1>Safari s*%ks!</h1>
                <h4>It does not support this application</h4>
                <p>Please use a different browser to access ULTRAVIOLET</p>
            </div>
        </>
    );
}
