import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
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

    return (
        <View style={styles.test}>
            <Navbar></Navbar>
            <ScrollView>
                <View>
                    <View style={styles.calendar}>
                        <Calendar
                            // Collection of dates that have to be marked. Default = {}
                            markedDates={{
                                '2022-06-16': { selected: true, marked: true, selectedColor: '#0077FF' },
                                '2022-06-17': { marked: true, dotColor: '#0077FF' },
                                '2022-06-18': { marked: true, dotColor: '#0077FF' },
                                '2022-06-19': { marked: true, dotColor: '#0077FF' }
                            }}
                        />
                    </View>
                    <View style={styles.body}>
                        <Text style={[{ fontFamily: 'Raleway_400Regular', fontSize: 18, textAlign: "center", marginTop: 20, marginBottom: 10, }]}>Your Monthly <Text style={tw`text-blue-500`}>Insights</Text></Text>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>Your Monthly Cashflow Was £4250</Text>
                            <View style={styles.cardCircle}></View>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>You Had 6 Events Occur</Text>
                            <View style={styles.cardCircleB}></View>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>Your Portfolio Consists Of 16 Properties</Text>
                            <View style={styles.cardCircleC}></View>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>You Paid £3250 In Mortgage Repayments</Text>
                            <View style={styles.cardCircle}></View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        display: "flex",
        margin: "auto",
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
        fontSize: 14,
    },
    calendar: {

    },
    test: {
        height: "100%",
        backgroundColor: "white",
    },
    card: {
        borderColor: "gray",
        borderWidth: 0.2,
        backgroundColor: 'white',
        margin: 8,
        height: 60,
        width: 325,
        alignSelf: 'center',
        borderRadius: 9,
    },
    cardText: {
        textAlign: "center",
        fontFamily: "Raleway_400Regular",
        marginTop: 23,
    },
    cardCircle: {
        width: 18,
        height: 60,
        backgroundColor: '#74eda3',
        borderRadius: 50,
        top: -40,
        left: -0.5
    },
    cardCircleB: {
        width: 18,
        height: 60,
        backgroundColor: '#d17030',
        borderRadius: 50,
        top: -40,
    },
    cardCircleC: {
        width: 18,
        height: 60,
        backgroundColor: '#883bed',
        borderRadius: 50,
        top: -40,
    }
});

