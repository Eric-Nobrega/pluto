import { StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';
import React, { useState, useEffect } from "react";
import { useFonts, Raleway_100Thin, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Ionicons } from '@expo/vector-icons';

// Date Variables
const newdate = new Date().toLocaleDateString();

export default function Navbar() {
    return (
        <View style={styles.navbar}>
            <View style={styles.navbarContent}>
                <Text style={[tw`mx-5 text-xl`, { fontFamily: 'Raleway_400Regular', fontSize: 20 }]}><Text style={tw`text-blue-500`}>p</Text>Luto</Text>
                <Text style={[tw`mx-5 text-xl`, { fontFamily: 'Raleway_400Regular', fontSize: 20 }]}>{newdate}</Text>
                <Text style={[tw`mx-5 text-xl`, { fontFamily: 'Raleway_400Regular', fontSize: 20, paddingTop: 3, }]}> <Ionicons name="person-circle-outline" size={30} /></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        borderColor: "black",
        borderWidth: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.22,
        elevation: 3,
        alignSelf: 'stretch',
        height: 90,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    navbarContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 48,
        paddingLeft: 10,
        paddingRight: 10,
    }
});

