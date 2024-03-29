import React, { useState } from "react";
import effectsProps from "./effectsProps";

export default function AddEffectButton({ addSelected }) {
    const [add, setAdd] = useState(false);

    return (
        <>
            <button onClick={() => setAdd(!add)}>+</button>

            {add ? (
                <div id="listEffect">
                    {Object.keys(effectsProps).map((key) => {
                        return (
                            <p
                                key={key}
                                onClick={() => {
                                    setAdd(!add);
                                    addSelected(effectsProps[key].eName);
                                }}
                            >
                                {effectsProps[key].eName}
                            </p>
                        );
                    })}{" "}
                </div>
            ) : null}
        </>
    );
}
