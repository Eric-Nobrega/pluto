import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import uuid from 'react-native-uuid';
import HouseList from '../components/HouseList';
import CustomButton from '../components/CustomButton';
import StyledButton from '../components/StyledButton';
import db from '../firebase';
import EmptyPage from "../components/EmptyPage"
import { color } from 'react-native-reanimated';


export default function App() {
    // Firestore User Property List Reference
    //const propertyRef = doc(db, "properties", "houseList")

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
        db.collection("properties").doc("houseList").update({
            houseItems: [...houseItems, houseItem]
        })
    }

    // Custom Property Modal Open/Close State
    const [propModalOpen, setPropModalOpen] = useState(false);

    // Custom Property State
    const [customProp, setCustomProp] = useState({
        Title: "",
        DueDate: "",
        Interval: "",
    });

    // Add Custom Property Function
    function addNewProps() {
        setPropModalOpen(false);

        houseItem[customProp] = customProp;


        // reset custom prop
        // houseItem[customProp] = "";
        setCustomProp("");
    }

    // Delete A Property Function
    const handleDelete = (id) => {
        const filteredArray = houseItems.filter((item) => item.houseID !== id);
        // Push the houseItems array to the database
        setHouseItems(filteredArray);
        db.collection("properties").doc("houseList").update({
            houseItems: filteredArray
        })
    };

    // Edit A Property Function
    const handleEdit = (id) => {

    }


    function conditionalRender() {
        if (houseItems.length == 0) {
            return (
                <View style={{ marginTop: 40 }}>
                    <EmptyPage />
                </View>
            )
        } else {

        }
    }

    return (
        <View style={styles.mainContainer}>
            <Navbar></Navbar>
            <ScrollView>
                <View>
                    <Modal visible={modalOpen}>
                        <Text style={{ fontFamily: 'Raleway_400Regular', fontSize: 20, padding: 15, paddingTop: 50, backgroundColor: "white", color: "#0077FF", textAlign: "center" }}>Add New Property</Text>
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
                                    /*
                                    if (key !== "houseID" && key !== "houseName" && key !== "housePostCode" && key !== "rentalIncome" && key !== "mortgageRepayment") {
                                        return (<View style={styles.test}>
                                            <TextInput placeholder={key + " Due Date"} placeholderTextColor={"gray"} onChangeText={newText => setHouseItem({ ...houseItem, [key.DueDate]: newText })} value={houseItem[key]} style={styles.testText}></TextInput>
                                            <TextInput placeholder={key + " Renewal Interval"} placeholderTextColor={"gray"} onChangeText={newText => setHouseItem({ ...houseItem, [key.Interval]: newText })} value={houseItem[key]} style={styles.testText}></TextInput>
                                        </View>)
                                    }
                                    */
                                    if (key !== "houseID") {
                                        return (<View style={styles.test}>
                                            <TextInput placeholder={formattedName} placeholderTextColor={"gray"} onChangeText={newText => setHouseItem({ ...houseItem, [key]: newText })} value={houseItem[key]} style={styles.testText}></TextInput>
                                        </View>)
                                    }
                                }
                            })}
                            <View style={styles.bottomButtons}>
                                <StyledButton title="Cancel" onPress={() => {
                                    setModalOpen(false);
                                }}></StyledButton>
                                <StyledButton title="Custom Event" onPress={() => {
                                    setPropModalOpen(true)
                                }}></StyledButton>
                                <StyledButton onPress={() => addItem()} title="Confirm"></StyledButton>
                            </View>
                        </View>
                        <Modal visible={propModalOpen}>
                            <View style={styles.modalContent2}>
                                <Text style={{ fontFamily: 'Raleway_400Regular', fontSize: 20, backgroundColor: "white", marginBottom: 50, color: "#0077FF", textAlign: "center" }}>Create Custom Event</Text>
                                <TextInput
                                    placeholder="Custom Event Name"
                                    placeholderTextColor={"gray"}
                                    onChangeText={newText => setCustomProp({ ...customProp, Title: newText})}
                                    value={customProp}
                                    style={styles.testText}
                                />
                                <TextInput
                                    placeholder="Due Date"
                                    placeholderTextColor={"gray"}
                                    onChangeText={newText => setCustomProp({ ...customProp, DueDate: newText })}
                                    value={customProp}
                                    style={styles.testText}
                                />
                                <TextInput
                                    placeholder="Interval"
                                    placeholderTextColor={"gray"}
                                    onChangeText={newText => setCustomProp({ ...customProp, Interval: newText })}
                                    value={customProp}
                                    style={styles.testText}
                                />
                                <View style={styles.bottomButtons2}>
                                    <StyledButton title="Add" onPress={() => {
                                        addNewProps();
                                    }}></StyledButton>
                                    <StyledButton title="Cancel" onPress={() => {
                                        setPropModalOpen(false);
                                    }}></StyledButton>
                                </View>
                            </View>
                        </Modal>
                    </Modal>
                </View >
                {/*Pass Through HouseItems, Handle Delete Method, Handle Edit Method*/}
                <HouseList houseItems={houseItems} handleDelete={handleDelete}></HouseList >
                {conditionalRender()}
            </ScrollView>
            <View style={styles.stickyButton} >
                <CustomButton onPress={() => { setModalOpen(true) }}></CustomButton>
            </View>
        </View >
    );
}

// Stylesheet
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        backgroundColor: "white",
    },
    modalContent: {
        height: "auto",
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
        bottom: -250,
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
        color: "black",
    },
    modalContent2: {
        paddingTop: 50,
        padding: 15,
    },
    bottomButtons2: {
        bottom: -30,
    }
});

