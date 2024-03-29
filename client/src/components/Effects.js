import React, { useState, useEffect } from "react";
import NewEffect from "./NewEffect";
import AddEffectButton from "./AddEffectButton";

let effects = [];

export default function Effects({ oscillator, output }) {
    const [fxChain, setFxChain] = useState([
        "Filter",
        "Distortion",
        "PingPongDelay",
    ]);

    const getFx = (fx) => {
        effects = [...effects, fx];
    };
    const removeFx = (index) => {
        effects.splice(index, 1);
    };
    const tweek = (orden, value, param, paramRamp) => {
        effects[orden].tweek(value, param, paramRamp);
        effects[orden].parameters.map((p) => {
            p.param == param ? (p.valueInit = value) : null;
        });
    };

    useEffect(() => {
        if (fxChain.length == 0) {
            oscillator.connect(output);
        }

        for (let i = 0; i < fxChain.length; i++) {
            effects[i].update(i);
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
        <div id="effectRack">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>Effects</h3>{" "}
                <div id="addEffectButton">
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
            <div id="effects">
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
                            remove={(i) => {
                                oscillator.disconnect(i);
                                let copy = [...fxChain];
                                copy.splice(i, 1);
                                removeFx(i);
                                setFxChain(copy);
                            }}
                        ></NewEffect>
                    );
                })}
            </div>
        </div>
    );
}
