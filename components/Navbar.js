import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin, Raleway_400Regular } from '@expo-google-fonts/raleway';

// Date Variables
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1;
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const newdate = day + "/" + month + "/" + year;

export default function Navbar() {
    let [fontsLoaded] = useFonts({
        Raleway_100Thin,
        Raleway_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.navbar}>
            <View style={styles.navbarContent}>
                <Text style={[tw`mx-5 text-xl`, {fontFamily: 'Raleway_400Regular', fontSize: 21 }]}><Text style={tw`text-blue-500`}>p</Text>Luto</Text>
                <Text style={[tw`mx-5 text-xl`, {fontFamily: 'Raleway_400Regular', fontSize: 21 }]}>{newdate}</Text>
                <Text style={[tw`mx-5 text-xl`, {fontFamily: 'Raleway_400Regular', fontSize: 21 }]}>Account</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        borderColor: "black",
        borderWidth: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignSelf: 'stretch',
        height: 90,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    navbarContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 48,
        fontFamily: "sans-serif",
    }
});

