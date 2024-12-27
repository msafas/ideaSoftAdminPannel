
// AuthContextProvider

import React, { createContext, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";



const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUsername] = React.useState(null);
    const [palletLogiUser, setPalletLogiUser] = React.useState(null)
    const [password, setPassword] = React.useState(null);
    const [AuthToken, setAuthToken] = React.useState(null);
    const [palletLogToken, setPalletLogToken] = React.useState(null)
    const [name, setName] = React.useState(null)
    const [lastName, setLastName] = React.useState(null);


    const navigation = useNavigation() as any;


    // const navigation = useNavigation()

    const setAuthInfo = (user, AuthToken) => {
        setUsername(user);
        setAuthToken(AuthToken);


        // try {
        //     await AsyncStorage.setItem("user", user);
        //     await AsyncStorage.setItem("xatuh", AuthToken);
        // } catch (error) {
        //     console.log(error);
        // }x
    };
    



    const removeAuthInfo = () => {
        setUsername(null);

        setAuthToken(null);
        setName(null);
        setLastName(null);


    };


    const logout = async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    };

    const values = React.useMemo(() => ({
        user,
        AuthToken,
        setAuthInfo,
        removeAuthInfo,
        palletLogiUser,
        logout
    }), [user,
        AuthToken,


    ]);




    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}