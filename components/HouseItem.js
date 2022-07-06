import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { useFonts, Raleway_100Thin, Raleway_400Regular, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import tw from 'twrnc';
import ConfirmButton from './ConfirmButton';

export default function HouseItem(props) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                <View>
                    <Text style={{ fontSize: "20px", fontSize: 16, fontWeight: "600", paddingHorizontal: 2 }}>{props.houseName}</Text>
                    <Text style={styles.test}></Text>
                    <Text style={{ fontSize: "20px", fontSize: 14, fontWeight: "normal", paddingHorizontal: 3, paddingTop: 6 }}><Text style={{fontWeight: "500"}}>Rental Income: </Text>£1250</Text>
                    <Text style={{ fontSize: "20px", fontSize: 14, fontWeight: "normal", paddingHorizontal: 3, paddingTop: 3, }}><Text style={{fontWeight: "500"}}>Mortgage Repayment: </Text>£650</Text>
                    <Text style={{ fontSize: "20px", fontSize: 14, fontWeight: "normal", paddingHorizontal: 3, paddingTop: 3, }}><Text style={{fontWeight: "500"}}>Monthly Cashflow: </Text>£550</Text>
                </View>
                <View style={styles.bodyRight}>
                    <Text style={{ fontSize: "20px", fontSize: 16, paddingHorizontal: 2, fontWeight: "600", color: "#0077FF" }}>{props.housePostCode}</Text>
                </View>
            </View>
            <View style={styles.bottomBorder}></View>
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
        height: 118,
        alignSelf: 'stretch',
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
        marginTop: 4
    }

});
