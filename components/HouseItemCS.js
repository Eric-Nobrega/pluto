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
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>{props.houseName}</Text>
                    <Text style={styles.test}></Text>
                    <Text style={{ color: "black", fontSize: 14 }}><Text style={{fontWeight:"500"}}>Rental Income: </Text>£{props.rentalIncome}</Text>
                    <Text style={{ color: "black", fontSize: 14 }}><Text style={{fontWeight:"500"}}>Mortgage Repayment: </Text>£{props.mortgageRepayment}</Text>
                </View>
                <View style={styles.bodyRight}>
                    <Text style={{ color: "green", fontWeight: "500", textAlign: "center", fontSize: 16 }}>+{props.profit}</Text>
                </View>
            </View>
            <View style={styles.bottomBorder}><Text></Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        color: "black",
        marginTop: 10,
        marginLeft: 13,
        marginRight: 13,
        borderRadius: 5,
        height: 50,
        alignSelf: 'stretch',
        height: 95,
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.12,
        shadowRadius: 1.22,
    },
    body: {
        flex: 1,
        padding: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    bottomBorder: {
        height: 2,
        backgroundColor: "#0077FF",
        opacity: 0.8,
        borderRadius: 5,
    },
    bodyRight: {
        marginLeft: "auto",
    },
    button: {
        color: "red",
        fontWeight: "bold",
    },
    test: {
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 0.2,
        width: 315,
        height: 1,
        marginTop: 5,
        marginBottom: 5,
    }

});
