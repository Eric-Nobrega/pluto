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
                    <Text style={{ fontSize: "20px",fontSize: 16 }}>{props.houseName}</Text>
                    <Text style={{ fontSize: "20px",  fontSize: 16, marginTop: 4 }}>{props.housePostCode}</Text>
                </View>
                <View style={styles.bodyRight}>
                    <ConfirmButton title="Edit Property" style={styles.button} onPress={() => { props.handleDelete(props.houseID) }} />
                    <ConfirmButton title="Delete" onPress={() => { props.handleDelete(props.houseID) }} />
                </View>
            </View>
            <View style={styles.bottomBorder}></View>
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
    },
    button: {
        color: "red",
    }

});
