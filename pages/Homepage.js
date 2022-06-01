import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import db from '../firebase';
import { set } from 'react-native-reanimated';

export default function App() {
    let [fontsLoaded] = useFonts({
        Raleway_100Thin,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View>
            <Navbar></Navbar>
            <View>
                <View style={styles.body}>
                    <View style={styles.networth}>
                        <Text style={styles.networthText}> Portfolio Value: $546,235.64</Text>
                    </View>
                </View>
                <View style={styles.calendar}>
                    <Calendar style={{ borderRadius: "10px" }}></Calendar>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: 15,
        overflow: "hidden",
    },
    networth: {
        borderColor: "gray",
        borderWidth: 0.2,
        borderRadius: 3,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignSelf: 'stretch',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    networthText: {
        fontFamily: "Raleway_400Regular",
    },
    calendar: {
        margin: 15,
        marginTop: 0,
        borderColor: "gray",
        borderWidth: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.01,
        shadowRadius: 2.22,
        elevation: 3,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        padding: 5,
    }
});
