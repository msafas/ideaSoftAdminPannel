import { createContext, useContext, useState, useEffect } from 'react'
import { generateUUID } from '../utils/uuid';
import { useConfig } from './ConfigProvider';


export const DeviceIdContext = createContext({});
export const useDeviceId = () => (useContext(DeviceIdContext) as any)?.value;

export const DeviceIdProvider = ({ children }) => {
    const config = useConfig();
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (value) return;
        var id = "";
        if (config?.config?.deviceId) {
            setValue(id = config.config.deviceId);
        }
        else {
            setValue(id = generateUUID());
            config.setConfigParameter("deviceId", id);
        }
        // console.log("Device Id: " + id);
    }, [config?.config?.deviceId]);
    // console.log("ID: " + config.config?.deviceId);
    if (!value) return undefined;

    return (
        <DeviceIdContext.Provider value={{ value, setValue }}>
            {children}
        </DeviceIdContext.Provider>
    );
};