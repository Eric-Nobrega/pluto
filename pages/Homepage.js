import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import db from '../firebase';
import { set } from 'react-native-reanimated';
import HouseList from '../components/HouseList';
import CashflowList from '../components/CashflowList';

export default function App() {
    // Property Item List
    const [houseItems, setHouseItems] = useState([]);
    useEffect(() => {
        // Create a reference to the cities collection
        db.collection("properties")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    setHouseItems(doc.data().houseItems)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, []);
    let [fontsLoaded] = useFonts({
        Raleway_100Thin,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.test}>
            <Navbar></Navbar>
            <View>
                <View style={styles.body}>
                </View>
                <View style={styles.calendar}>
                    <Calendar />
                    <CashflowList houseItems={houseItems} />
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
        paddingTop: 13,
        marginTop: -5,
    },
    networthText: {
        fontFamily: "Corbel",
        fontSize: 14,
    },
    calendar: {

    },
    test: {
        height: "100%",
    }
});
