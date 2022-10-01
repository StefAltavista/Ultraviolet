import React from "react";
import * as Tone from "tone";

export default function Effects({ eName, parameters, orden, FX, tweekFX }) {
    class EFX {
        constructor(eName, parameters, orden) {
            this.orden = orden;
            this.name = eName;
            this.parameters = [...parameters];
            let params = {};
            for (let i = 0; i < parameters.length; i++) {
                params = { ...params, [parameters[i].param]: 0 };
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
    }
    let newEffect = new EFX(eName, parameters, orden);
    FX(newEffect);

    return (
        <div className="effect">
            <h3>{newEffect.name}</h3>
            {newEffect.parameters.map((p) => {
                return (
                    <div key={p.param}>
                        <p>{p.param}</p>
                        <input
                            type="range"
                            min={0}
                            max={p.maxValue}
                            step={p.step}
                            defaultValue={0}
                            onChange={(e) =>
                                tweekFX(
                                    newEffect.orden,
                                    e.target.value,
                                    p.param,
                                    p.paramRamp
                                )
                            }
                        ></input>
                    </div>
                );
            })}
        </div>
    );
}
