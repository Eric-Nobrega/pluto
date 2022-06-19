import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import db from '../firebase';
import HouseList from '../components/HouseList';
import CashflowList from '../components/CashflowList';
import EmptyPage from "../components/EmptyPage"

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
        calcCashflow()
    }, [houseItems]);

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

    function conditionalRender() {
        if (houseItems.length == 0) {
            return (
                <EmptyPage />
            )
        } else {

        }
    }

    return (

        <View style={styles.mainContainer}>
            <Navbar></Navbar>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.networth}>
                        <Text style={styles.networthText}>Monthly Cashflow: <Text style={{ color: "green", fontWeight: "500" }}>+£{totalCashflow}</Text></Text>
                    </View>
                </View>
                <CashflowList houseItems={houseItems} />
                {conditionalRender()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        backgroundColor: "white",
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
