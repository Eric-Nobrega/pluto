import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import db from '../firebase';
import HouseList from '../components/HouseList';
import CashflowList from '../components/CashflowList';

export default function App() {
    // Property Item List
    const [houseItems, setHouseItems] = useState([]);
    const [totalCashflow, setTotalCashflow] = useState(0);

    function calcCashflow() {
        var total = 0;
        houseItems.forEach(function (item) {
            total += item.profit;
        });
        setTotalCashflow(total);
    }

    useEffect(() => {
        // Create a reference to the cities collection
        db.collection("properties")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    setHouseItems(doc.data().houseItems)
                    calcCashflow()
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }, []);

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <Navbar></Navbar>
                <View style={styles.body}>
                    <View style={styles.networth}>
                        <Text style={styles.networthText}>Total Cashflow (Monthly): <Text style={{ color: "green", fontFamily: "Corbel", fontWeight: "500" }}>+£{totalCashflow}</Text></Text>
                    </View>
                </View>
                <CashflowList houseItems={houseItems} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    body: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: 5,
        overflow: "hidden",
    },
    networthText: {
        fontFamily: "Corbel",
        fontSize: 16,
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
        paddingTop: 12,
        marginTop: -5,
    },
});
