<script src="http://192.168.0.42:8097"></script>
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
    let [sortedArray, setSortedArray] = useState([])
    let [testArray, setTestArray] = useState([])
    const [selectedItem, setSelectedItem] = useState('')
    var sortedAsc;

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
        console.log("houseItems")
        console.log(houseItems)
    }

    function getEvents() {
        console.log("Attempting To Get Events")
        // Iterate Through houseItems
        houseItems.forEach(element => {
            // Store Keys Other Than Defaults In Array (upcomingEvents)
            for (const [key, value] of Object.entries(element)) {
                if (key !== "houseName" && key !== "houseID" && key !== "mortgageRepayment" && key !== "rentalIncome" && key !== "housePostCode" && key !== "profit") {
                    //upcomingEvents.push(element)
                    element[key].forEach(element => {
                        upcomingEvents.push(element.Title)
                    });
                }
            }
        })
        // Remove Duplicates
        const uniqueEvents = [...new Set(upcomingEvents)];
        // Set State
        setUpcomingEvents(uniqueEvents)
    }

    // Extract Individual Duedates for HouseItemUP Property
    function getDueDate(element) {
        for (const [key, value] of Object.entries(element)) {
            if (key !== "houseName" && key !== "houseID" && key !== "mortgageRepayment" && key !== "rentalIncome" && key !== "housePostCode" && key !== "profit") {
                console.log("DATE")
                console.log(new Date(value.DueDate.seconds * 1000).toLocaleDateString())
                // value.DueDate = new Date(value.DueDate.seconds * 1000).toLocaleDateString()
                return (new Date(value.DueDate.seconds * 1000).toLocaleDateString())
            }
        }
    }

    function getDate(element) {
        let d;
        for (const [key] of Object.entries(element)) {
            if (key !== "houseName" && key !== "houseID" && key !== "mortgageRepayment" && key !== "rentalIncome" && key !== "housePostCode" && key !== "profit") {
                element[key].forEach(subElement => {
                    if (subElement.Title === selectedItem) {
                        d = new Date(subElement.DueDate.toDate());
                    }
                });
            }
        }
        return (d.toDateString())
    }

    function getDateFunction() {
        houseItems.forEach(element => {
            for (const [key, value] of Object.entries(element)) {
                if (key !== "houseName" && key !== "houseID" && key !== "mortgageRepayment" && key !== "rentalIncome" && key !== "housePostCode" && key !== "profit") {
                    //console.log(new Date(value.DueDate.seconds * 1000).toLocaleDateString())
                }
            }
        })
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
            //  getDateFunction()
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

    function sortArray() {
        // iterate thru the mapped array
        mappedArray.forEach(element => {
            for (const [key, value] of Object.entries(element)) {
                if (key !== "houseName" && key !== "houseID" && key !== "mortgageRepayment" && key !== "rentalIncome" && key !== "housePostCode" && key !== "profit") {
                    setSortedArray(mappedArray.sort((a, b) => new Date(a[value].DueDate.toDate()) - new Date(b[value].DueDate.toDate())))
                }
            }
        });
    }

    /*
    useEffect(() => {
        // sortArray()
        sortArray()
    }, [mappedArray]);
    */

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
                            setMappedArray([]);
                            setSortedArray([]);
                            // Iterate Through houseItems
                            houseItems.forEach(element => {
                                for (const [key, value] of Object.entries(element)) {
                                    if (key !== "houseName" && key !== "houseID" && key !== "mortgageRepayment" && key !== "rentalIncome" && key !== "housePostCode" && key !== "profit") {
                                        element[key].forEach(subElement => {
                                            if (subElement.Title === item) {
                                                console.log(element)
                                                console.log(subElement)
                                                setMappedArray(mappedArray => [...mappedArray, element])
                                                setSelectedItem(item)
                                            }
                                        });
                                    }
                                }
                            })
                            /*
                            console.log("Mapped Array")
                            console.log(mappedArray)
                            console.log("Sorted Array")
                            console.log(sortedArray)
                            console.log("Test Array")
                            console.log(testArray)
                            */

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
                                    selectedOptionDueDate={getDate(item)}
                                    //timeRemaining={getDateFunction(item)}
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
    mainContainer: {
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
