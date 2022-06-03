import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView} from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import uuid from 'react-native-uuid';
import HouseList from '../components/HouseList';
import CustomButton from '../components/CustomButton';
import StyledButton from '../components/StyledButton';
import db from '../firebase';

export default function App() {
    useEffect(() => {
        // Create a reference to the cities collection
        db.collection("properties")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.data().houseItems)
                    setHouseItems(doc.data().houseItems)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, []);

    // Firestore User Property List Reference
    var propertyRef = db.collection("properties");
    // State Management
    // Property Item Object
    const [houseItem, setHouseItem] = useState({
        houseID: uuid.v4(),
        houseName: "",
        housePostCode: "",
        rentalIncome: "",
        mortgageRepayment: "",
    });

    // Property Item List
    const [houseItems, setHouseItems] = useState([]);

    console.log("House Items")
    console.log(houseItems)

    // Modal Open/Close State
    const [modalOpen, setModalOpen] = useState(false);

    // Add Property Function
    function addItem() {
        setModalOpen(false);
        houseItem["profit"] = houseItem.rentalIncome - houseItem.mortgageRepayment;
        setHouseItems([...houseItems, houseItem])
        setHouseItem({
            houseID: uuid.v4(),
            houseName: "",
            housePostCode: "",
            rentalIncome: "",
            mortgageRepayment: "",
        })
        // Push the houseItems array to the database
        propertyRef.doc("houseList").set({ houseItems })
    }

    // Custom Property Modal Open/Close State
    const [propModalOpen, setPropModalOpen] = useState(false);

    // Custom Property State
    const [customProp, setCustomProp] = useState("");

    // Add Custom Property Function
    function addNewProps() {
        setPropModalOpen(false);
        houseItem[customProp] = "";
        setCustomProp("");
    }

    // Handle Remove Property Function
    const handleDelete = (id) => {
        const filteredArray = houseItems.filter((item) => item.houseID !== id);
        setHouseItems(filteredArray);
    };


    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <Navbar></Navbar>
                <View>
                    <Modal visible={modalOpen}>
                        <Text style={{ fontFamily: 'Raleway_400Regular', fontSize: 20, padding: 15, paddingTop: 50, backgroundColor: "#0077FF", color: "white", textAlign: "center" }}>Add New Property</Text>
                        <View style={styles.modalContent}>
                            {Object.keys(houseItem).map((key) => {
                                {
                                    let formattedName = key;
                                    if (key == "houseName") {
                                        formattedName = "Street Address"
                                    }
                                    if (key == "housePostCode") {
                                        formattedName = "Property Post Code"
                                    }
                                    if (key == "rentalIncome") {
                                        formattedName = "Rental Income (Monthly)"
                                    }
                                    if (key == "mortgageRepayment") {
                                        formattedName = "Mortgage Payment (Monthly)"
                                    }
                                    if (key !== "houseID" && key !== "houseName" && key !== "housePostCode" && key !== "rentalIncome" && key !== "mortgageRepayment") {
                                        return (<View style={styles.test}>
                                            <TextInput placeholder={key + " Renewal Date"} onChangeText={newText => setHouseItem({ ...houseItem, [key]: newText })} value={houseItem[key]} style={styles.testText}></TextInput>
                                        </View>)
                                    }
                                    if (key !== "houseID") {
                                        return (<View style={styles.test}>
                                            <TextInput placeholder={formattedName} onChangeText={newText => setHouseItem({ ...houseItem, [key]: newText })} value={houseItem[key]} style={styles.testText}></TextInput>
                                        </View>)
                                    }
                                }
                            })}
                        </View>
                        <View style={styles.bottomButtons}>
                            <StyledButton title="Cancel" onPress={() => {
                                setModalOpen(false);
                            }}></StyledButton>
                            <StyledButton title="Create Event" onPress={() => {
                                setPropModalOpen(true)
                            }}></StyledButton>
                            <StyledButton onPress={() => addItem()} title="Create Property"></StyledButton>
                        </View>
                        <Modal visible={propModalOpen}>
                            <View style={styles.modalContent}>
                                <Text>Custom Property Event</Text>
                                <TextInput
                                    style={{
                                        height: 40, borderBottomColor: 'red',
                                        borderBottomWidth: 2,
                                    }}
                                    placeholder="Add New Event"
                                    onChangeText={newText => setCustomProp(newText)}
                                    value={customProp}
                                />
                                <Button title="Add" onPress={() => {
                                    addNewProps();
                                }}></Button>
                            </View>
                        </Modal>
                    </Modal>
                </View >
                {/*Pass Through HouseItems, Handle Delete Method, Handle Edit Method*/}
                <HouseList houseItems={houseItems} handleDelete={handleDelete} ></HouseList >
                <View style={styles.stickyButton} >
                    <CustomButton onPress={() => { setModalOpen(true) }}></CustomButton>
                </View>
            </View >
        </ScrollView>
    );
}

// Stylesheet
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        backgroundColor: "yellow"
    },
    stickyButton: {
        position: "absolute",
        right: 10,
        bottom: 10,
        padding: 15,
    },
    bottomButtons: {

    },
    test: {
        alignSelf: 'stretch',
        margin: 10,
        padding: 5,
    },
    testText: {
        fontSize: 18,
        fontFamily: 'Raleway_400Regular',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        paddingBottom: 5,
    }
});

