import React, { createContext, useContext, useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { Portal, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export enum ToastType {
    Success = "success",
    Error = "error",
    Info = "info",
    Warning = "warning"
}

export interface ToastItem {
    id: any
    type: ToastType
    message?: string
    title?: string
    ttl?: number
}

interface UseToastActions {
    show: (type: ToastType, message?: string, title?: string, ttl?: number) => any
    remove: (id: any) => void
}

export const ToastContext = createContext(null);
export function useToast(): UseToastActions {
    return useContext(ToastContext);
}

var globalId = 0;
export function ToastProvider(props: any) {
    const [toasts, setToasts] = useState([]);
    const [removes, setRemoves] = useState([]);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (removes.length > 0) {
            setToasts(toasts.filter(x => !removes.includes(x.id)));
            setRemoves([]);
        }
    }, [removes]);

    const remove = (id: any) => {
        // console.log('removed', id);
        setRemoves([...removes, id]);
    };

    const show = (type: ToastType, title: string, message: string, ttl: number = 3000) => {
        var id = globalId++;

        setToasts([...toasts, { type, title, message, ttl, id: (toasts.length + "-" + removes.length + "-" + Math.random()) }]);

        return id;
    };

    return (<ToastContext.Provider value={{
        show: show,
        remove: remove
    }}>
        {props.children}
        <Portal>
            <View style={{
                position: 'absolute',
                zIndex: 9999999,
                left: 0, right: 0,
                paddingTop: insets.top + 10
            }}>
                {toasts.map((toast, index) => {
                    return (<ToastView key={toast.id} data={toast} onHide={((toast) => {
                        remove(toast.id);
                    }).bind(null, toast)} />);
                })}
            </View>
        </Portal>
    </ToastContext.Provider>)
}

export function ToastView(props: {
    data: any,
    onHide?: () => void
}) {
    const [ani] = useState(new Animated.Value(0));
    const data = props.data;
    const theme = useTheme();

    const show = () => {
        ani.setValue(0);
        Animated.timing(ani, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };
    const hide = () => {
        ani.setValue(1);
        Animated.timing(ani, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(props.onHide);
    };

    useEffect(() => {
        show();

        if (data.ttl) {
            setTimeout(() => {
                hide();
            }, data.ttl);
        }
        return props.onHide;
    }, []);

    const colorMap = {
        [ToastType.Success]: theme.colors.success,
        [ToastType.Error]: theme.colors.error,
        [ToastType.Info]: theme.colors.info,
        [ToastType.Warning]: theme.colors.warning
    }

    return (<>
        <Animated.View style={{
            backgroundColor: colorMap[data.type],
            borderRadius: 12,
            margin: 3,
            padding: 10,
            marginHorizontal: 10,
            opacity: ani,
            transform: [
                {
                    translateY: ani.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 0]
                    })
                }
            ]
        }}>
            {data.title && <Text variant="titleMedium">{data.title}</Text>}
            {data.message && <Text variant="labelMedium">{data.message}</Text>}
        </Animated.View>
    </>);
}