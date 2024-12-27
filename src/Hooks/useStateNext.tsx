import { useState } from "react";

export function useStateNext(def?: any) {
    const [state, setState] = useState(def);
    const [whenChange, setWhenChange] = useState(0);

    return {
        0: state,
        1: setState,
        value: state,
        whenChange: whenChange,
        setValue: (v: any) => {
            setState(v);
            setWhenChange((whenChange + 1) % 3);
        },
        setInitialValue: (v: any) => {
            setState(v);
        }
    };
}