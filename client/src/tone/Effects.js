import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import NewEffect from "./NewEffect";
import AddEffectButton from "./AddEffectButton";

let effects = [];

export default function Effects({ oscillator, output }) {
    const [fxChain, setFxChain] = useState([]);

    const getFx = (fx) => {
        effects = [...effects, fx];
    };
    const tweek = (orden, value, param, paramRamp) => {
        effects[orden].tweek(value, param, paramRamp);
        effects[orden].parameters.map((p) => {
            p.param == param ? (p.valueInit = value) : null;
        });
    };

    useEffect(() => {
        console.log("connections ");
        if (fxChain.length == 0) {
            oscillator.connect(output);
        }

        for (let i = 0; i < fxChain.length; i++) {
            if (i == 0) {
                oscillator.connect(effects[i].effect);
            }
            if (i == fxChain.length - 1) {
                effects[i].effect.connect(output);

                break;
            } else {
                effects[i].effect.connect(effects[i + 1].effect);
            }
        }
    }, [fxChain]);

    return (
        <div id="effectRack" style={{ display: "flex", flexDirection: "row" }}>
            {fxChain.map((fx, i) => {
                return (
                    <NewEffect
                        key={i}
                        orden={i}
                        eName={fx}
                        list={effects}
                        FX={(fx) => getFx(fx)}
                        tweekFX={(orden, value, param, paramRamp) => {
                            tweek(orden, value, param, paramRamp);
                        }}
                    ></NewEffect>
                );
            })}
            <div>
                <AddEffectButton
                    addSelected={(selectedEffect) => {
                        oscillator.disconnect();
                        effects.map((fx) => {
                            fx.effect.disconnect();
                        });

                        let chain = [...fxChain, selectedEffect];
                        setFxChain(chain);
                    }}
                />
            </div>
        </div>
    );
}
