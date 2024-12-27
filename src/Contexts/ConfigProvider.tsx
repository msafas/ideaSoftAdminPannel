import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useStateNext } from "../Hooks/useStateNext";

const ConfigContext = createContext({});

export enum Language {
    EN = "en",
    TR = "tr"
}

interface ConfigState {
    isDarkMode: boolean;
    deviceId: string;
    lang: keyof Language;
    token: string;
    expireDate: string;
    sessionId: string;
}
interface ConfigContext {
    config: ConfigState;
    setConfig: (config: any) => void;
    setConfigParameter: (key: keyof ConfigState, value: any) => void;
    getConfigParameter: (key: keyof ConfigState) => any;
}

export function useConfig() {
    return useContext(ConfigContext) as ConfigContext;
}

export function ConfigProvider(props: any) {
    const state = useStateNext({});
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        if (isInit) {
            AsyncStorage.setItem("app-config", JSON.stringify(state.value));
        }
    }, [state.whenChange, state.value]);

    useEffect(() => {
        AsyncStorage.getItem("app-config").then((v) => {
            if (v) {
                state.setInitialValue(JSON.parse(v) || {});
            }
        }).finally(() => {
            setIsInit(true);
        });
    }, []);

    if (!isInit) return undefined;
    // console.log("CONFIG", state.value);
    return (
        <ConfigContext.Provider value={{
            config: state.value,
            setConfig: (v) => (state.setValue({ ...state.value, ...v })),
            setConfigParameter: (key: keyof ConfigState, value: any) => {
                state.setValue({
                    ...state.value,
                    [key]: value
                });
            },
            getConfigParameter: (key: keyof ConfigState) => {
                return state.value[key];
            }
        }}>
            {props.children}
        </ConfigContext.Provider>
    );
}