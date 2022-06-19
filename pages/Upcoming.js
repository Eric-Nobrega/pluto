import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import SelectDropdown from 'react-native-select-dropdown'
import db from '../firebase';
import UpcomingList from '../components/UpcomingList';
import HouseItemUP from '../components/HouseItemUP';
//import { Button } from 'react-native-web';

export default function App() {
    const [houseItems, setHouseItems] = useState([])
    const [events, setEvents] = useState([])
    // upcoming events options
    const [upcomingEvents, setUpcomingEvents] = useState([])
    // selected option
    const [selectedOption, setSelectedOption] = useState('')
    // mapped array
    let [mappedArray, setMappedArray] = useState([])
    const [selectedItem, setSelectedItem] = useState('')

    function changeSelectedOption(x) {
        setSelectedOption(x)
        console.log("The Selected Option is: " + selectedOption)
    }

    // Get HouseItems From Database
    async function getData() {
        console.log("Fetching Data From DB")
        if (houseItems.length === 0) {
            // Create a reference to the cities collection
            await db.collection("properties")
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
        }
        houseItems.forEach(element => {
            console.log("House Name: " + element.houseName)
        });
    }

    function getEvents() {
        console.log("Attempting To Get Events")
        // Iterate Through houseItems
        houseItems.forEach(element => {
            // Store Keys Other Than Defaults In Array (upcomingEvents)
            for (const [key, value] of Object.entries(element)) {
                if (key !== "houseName" && key !== "houseID" && key !== "mortgageRepayment" && key !== "rentalIncome" && key !== "housePostCode" && key !== "profit") {
                    console.log(value)
                    upcomingEvents.push(value.Title)
                }
            }
        })
        // Remove Duplicates
        const uniqueEvents = [...new Set(upcomingEvents)];
        // Set State
        setUpcomingEvents(uniqueEvents)
    }

    useEffect(() => {
        // Make Database Call On Page Load
        if (houseItems.length === 0) {
            getData()
        }
        // Get Different Events From The houseItems Array That Is Now Loaded
        // Only Execute Once houseItems Are Loaded
        if (houseItems.length > 0) {
            getEvents()
            displaySelected()
        }
    }, [houseItems]);

    // Display The houseItems That Are Have The Currently Loaded Property
    function displaySelected() {
        // Iterate Through houseItems
        houseItems.forEach(element => {
            // Store Keys Other Than Defaults In Array (upcomingEvents)
            if (element.hasOwnProperty(selectedOption)) {
                console.log(element)
            }
        })
    }


    return (
        <View style={styles.mainContainer}>
            <Navbar></Navbar>
            <ScrollView>
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
                        data={upcomingEvents}
                        onSelect={(item) => {
                            setMappedArray([])
                            // Iterate Through houseItems
                            houseItems.forEach(element => {
                                for (const [key, value] of Object.entries(element)) {
                                    console.log('key' + value.Title)
                                    if (value.Title == item) {
                                        setMappedArray(mappedArray => [...mappedArray, element])
                                        console.log('found')
                                        setSelectedItem(item)
                                    }
                                }
                            })
                        }}
                        on
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    {mappedArray.map((item) => {
                        return (
                            <View key={item.houseID}>
                                <HouseItemUP key={item.houseID}
                                    houseID={item.houseID}
                                    houseName={item.houseName}
                                    selectedOptionDueDate={item[selectedItem]}
                                >
                                </HouseItemUP>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: 'white',
        height: '100%',
    },
    body: {
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
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'center' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', borderRadius: 8, height: "auto" },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
});
