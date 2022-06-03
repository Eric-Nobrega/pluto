import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown'

export default function App() {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
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
                <SelectDropdown
                    defaultButtonText={'Select An Upcoming Event'}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                    search
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder={'Search here'}
                    searchPlaceHolderColor={'black'}
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
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
    },
    dropdown1BtnStyle: {
        width: '90%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 0.2,
        borderColor: '#444',
        margin: 20,
        fontFamily: "Corbel"
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'center', fontFamily: "Corbel" },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', borderRadius: 8, },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontFamily: "Corbel" },
    dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        fontFamily: "Corbel"
    },
});
