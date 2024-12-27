import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/CategoryScreen/CategoryScreen";
import HomeBottomBar from "./BottomBar/HomeBottomBar";


const Stack = createNativeStackNavigator();

export function AppRouter() {


  return (
    <>
    <Stack.Navigator
    id={undefined}
    screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    initialRouteName="HomeBottomBar"
  >
    {/* BOTTOMBAR */}
      
    <Stack.Screen name="HomeBottomBar" component={HomeBottomBar} />


  </Stack.Navigator>
  </>

  );
}
