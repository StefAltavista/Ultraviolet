import React from "react";
import * as Tone from "tone";
import effectsProps from "./effectsProps";

export default function NewEffect({ eName, orden, FX, tweekFX, list, remove }) {
    let newEffect = {};
    if (!list[orden]) {
        newEffect = new EFX(eName, orden);
        FX(newEffect);
    } else {
        newEffect = list[orden];
    }

    return (
        <div id="effect">
            <div className="effectHead">
                <h3>{newEffect.eName}</h3>
                <button onClick={() => remove(orden)}>-</button>
            </div>
            {newEffect.parameters.map((p, i) => {
                return (
                    <div key={p.param}>
                        <p>{p.param}</p>
                        <input
                            type="range"
                            min={0}
                            max={p.maxValue}
                            step={p.step}
                            defaultValue={p.valueInit}
                            onChange={(e) => {
                                tweekFX(
                                    newEffect.orden,
                                    e.target.value,
                                    p.param,
                                    p.paramRamp
                                );
                            }}
                        ></input>
                    </div>
                );
            })}
        </div>
    );
}
class EFX {
    constructor(eName, orden) {
        this.orden = orden;
        this.eName = eName;
        this.parameters = [...effectsProps[eName].parameters];
        let params = {};
        for (let i = 0; i < this.parameters.length; i++) {
            params = {
                ...params,
                [this.parameters[i].param]: this.parameters[i].valueInit,
            };
        }
        this.effect = new Tone[eName](params);
    }
    tweek(value, param, paramRamp) {
        if (paramRamp) {
            this.effect[param].linearRampToValueAtTime(value, Tone.now());
        } else {
            this.effect[param] = value;
        }
    }
    update(i) {
        this.orden = i;
    }
}
