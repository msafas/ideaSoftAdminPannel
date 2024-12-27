import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from '../../svg/svg';
import { useTheme } from 'react-native-paper';


const Header = () => {
    const theme = useTheme();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image
                    resizeMode='contain'
                    source={{ uri: "https://ideacdn.net/idea/kh/32/myassets/std_theme_files/tpl-fexx/assets/uploads/logo.png?revision=1653389725" }}
                    style={{ width: 100, height: 100 }}
                />
            </View>
            <View style={styles.iconsContainer}>
              
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 10,
    },
    iconsContainer: {
        flexDirection: "row",
        flex: 0.6,
        justifyContent: "space-around",
    },
    basketIconContainer: {
        position: "absolute",
        top: -10,
        right: -12,
        width: 16,
        height: 16,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    basketCount: {
        color: "white",
        fontSize: 10,
        fontWeight: "500",
    },
});

export default Header;
