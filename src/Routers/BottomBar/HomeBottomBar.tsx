import { View, Image, Touchable } from 'react-native'
import React, { useEffect } from 'react'
import { BottomNavigation, Card, Text, useTheme } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/CategoryScreen/CategoryScreen';
import { screenHeight } from '../../utils/sizeHelper';
import CategoryScreen from '../../Screens/CategoryScreen/CategoryScreen';
import Icon from '../../svg/svg';
import ProductsScreen from '../../Screens/ProductsScreen/ProductsScreen';
import CategoryAddedScreen from '../../Screens/CategoryAddedScreen/CategoryAddedScreen';
import CategoryEditScreen from '../../Screens/CategoryEditScreen/CategoryEditScreen';
import ProductAddedScreen from '../../Screens/ProductAddedScreen/ProductAddedScreen';
import ProductDetailScreen from '../../Screens/ProductDetailScreen/ProductDetailScreen';




const Tab = createBottomTabNavigator();

export default function HomeBottomBar(props) {
    const theme = useTheme();
    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.colors.backgroundWhite,
        }}>

            <Tab.Navigator
                id='TabNavigatorId'
                initialRouteName={'CategoryScreenStack'}
                defaultScreenOptions={

                    {
                        title: 'Centered',
                        headerTitleAlign: 'center'
                    }
                }
                screenOptions={({ route }) => ({
                    tabBarStyle: {

                        backgroundColor: theme.colors.purple, // Transparent arka plan rengi
                        alignContent: "center",
                        justifyContent: "center",
                        headerTitleAlign: 'center',
                        borderTopEndRadius: 0,
                        borderTopStartRadius: 0,
                        borderTopWidth: 0

                    },

                    headerTitleStyle: {
                        color: theme.colors.primary,

                    },
                    headerStyle: {

                        // Specify the height of your custom header
                    },
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarHideOnKeyboard: true,

                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === "CategoryScreenStack") {
                            return (
                                <View>
                                    <Icon
                                        iconName={"category"}
                                        color={focused ? 'white' : 'white'}
                                        size={30}
                                    />
                                </View>
                            );
                        }
                        else if (route.name === "ProductsScreenStack") {
                            return (
                                <View>
                                    <Icon
                                        iconName={"category"}
                                        color={focused ? 'white' : 'white'}
                                        size={30}
                                    />
                                </View>
                            );
                        }
                    },
                    tabBarInactiveTintColor: '#A0A0A0',
                    tabBarActiveTintColor: "white",
                })}
            >
                <Tab.Screen name={"ProductsScreenStack"} component={ProductsScreenStack} options={{
                    tabBarLabel: "Ürünler",
                }} />
                <Tab.Screen name={"CategoryScreenStack"} component={CategoryScreenStack}  options={{
                    tabBarLabel: "Kategoriler",
                }}/>
            </Tab.Navigator>
        </View>
    );
}


const Stack = createNativeStackNavigator();
function CategoryScreenStack(props) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}

            initialRouteName={'CategoryScreen'}>
            <Stack.Screen name="CategoryScreen" key={'CategoryScreen'} component={CategoryScreen}/>
            <Stack.Screen name="CategoryAddedScreen" key={'CategoryAddedScreen'} component={CategoryAddedScreen} />
            <Stack.Screen name="CategoryEditScreen" key={'CategoryEditScreen'} component={CategoryEditScreen} />

        </Stack.Navigator>
    );
}

function ProductsScreenStack(props) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}

            initialRouteName={'ProductsScreen'}>
            <Stack.Screen name="ProductsScreen" key={'ProductsScreen'} component={ProductsScreen}/>
            <Stack.Screen name="ProductAddedScreen" key={'ProductAddedScreen'} component={ProductAddedScreen} />
            <Stack.Screen name="ProductDetailScreen" key={'ProductDetailScreen'} component={ProductDetailScreen} />


        </Stack.Navigator>
    );
}






