import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import React, { useState } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import uuid from 'react-native-uuid';
import HouseList from '../components/HouseList';
import CustomButton from '../components/CustomButton';

export default function App() {
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

    // Modal Open/Close State
    const [modalOpen, setModalOpen] = useState(false);

    // Add Property Function
    function addItem() {
        setModalOpen(false);
        setHouseItems([...houseItems, houseItem])
        setHouseItem({
            houseID: uuid.v4(),
            houseName: "",
            housePostCode: "",
            rentalIncome: "",
            mortgageRepayment: "",
        })
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

    return (
        <View style={styles.mainContainer}>
            <Navbar></Navbar>
            <View>
                <Modal visible={modalOpen}>
                    <View style={styles.modalContent}>
                        <Text>Add New Property</Text>
                        {Object.keys(houseItem).map((key) => {
                            return (
                                <TextInput placeholder={key} onChangeText={newText => setHouseItem({ ...houseItem, [key]: newText })} value={houseItem[key]}></TextInput>
                            )
                        })}
                    </View>
                    <Button title="Cancel" onPress={() => {
                        setModalOpen(false); (false)
                    }}></Button>
                    <Button onPress={() => addItem()} title="Confirm"></Button>
                    <Button title="Add Custom Event" onPress={() => {
                        setPropModalOpen(true)
                    }}></Button>
                    <Modal visible={propModalOpen}>
                        <View style={styles.modalContent}>
                            <Text>Custom Property Event</Text>
                            <TextInput
                                style={{ height: 40 }}
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
            < HouseList houseItems={houseItems} ></HouseList >
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
    },
    modalContent: {
        paddingTop: "50%",
        justifyContent: "center",
        alignItems: "center",
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
    }
});

