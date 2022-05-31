import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
                <Calendar></Calendar>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    body: {
    },
});
