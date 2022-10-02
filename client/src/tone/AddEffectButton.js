import React, { useState } from "react";
import effectsProps from "./effectsProps";

export default function AddEffectButton({ addSelected }) {
    const [add, setAdd] = useState(false);

    return (
        <>
            <button onClick={() => setAdd(!add)}>Add Effect</button>
            {add
                ? Object.keys(effectsProps).map((key) => {
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
                  })
                : null}
        </>
    );
}
