import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { useFonts, Raleway_100Thin, Raleway_400Regular, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import tw from 'twrnc';
import ConfirmButton from './ConfirmButton';

export default function HouseItemCS(props) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                <View>
                    <Text style={{ fontFamily: 'Corbel', fontSize: 15, fontWeight: "500" }}>{props.houseName}</Text>
                    <Text style={{ color: "black", fontFamily: 'Corbel', fontSize: 15 }}>Rental Income: £{props.rentalIncome}</Text>
                    <Text style={{ color: "black", fontFamily: 'Corbel', fontSize: 15 }}>Mortgage Payment: £{props.mortgageRepayment}</Text>
                </View>
                <View style={styles.bodyRight}>
                    <Text style={{ color: "green", fontWeight: "500", textAlign: "center" }}>+{props.profit}</Text>
                </View>
            </View>
            <View style={styles.bottomBorder}><Text></Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        color: "black",
        margin: 10,
        height: 50,
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
    },
    body: {
        flex: 1,
        padding: 7,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    bottomBorder: {
        height: 3,
        backgroundColor: "#0077FF",
    },
    bodyRight: {
        marginLeft: "auto",
        backgroundColor: "white",
        height: "25%",
        width: "15%",
        borderRadius: 5,
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
    },
    button: {
        color: "black",
    },

});
