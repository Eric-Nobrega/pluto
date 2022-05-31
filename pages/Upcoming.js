import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';

export default function App() {
    let [fontsLoaded] = useFonts({
        Raleway_100Thin,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.mainContainer}>
            <Navbar></Navbar>
            <View style={styles.body}>
                <Text style={{ fontFamily: 'Raleway_100Thin', fontSize: 28 }}>Upcoming</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    body: {
        paddingTop: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
});
