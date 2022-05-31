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
        const newItem = {
            houseID: houseItem.id,
            houseName: houseItem.name,
            housePostCode: houseItem.postCode,
            rentalIncome: houseItem.rentalIncome,
            mortgageRepayment: houseItem.mortgageRepayment,
        };
        setHouseItems([...houseItems, newItem])
        setHouseItem(houseItem.id = uuid.v4(), houseItem.name = "", houseItem.postCode = "", houseItem.rentalIncome = "", houseItem.mortgageRepayment = "")
    }

    return (
        <View style={styles.mainContainer}>
            <Navbar></Navbar>
            <View>
                <Modal visible={modalOpen}>
                    <View style={styles.modalContent}>
                        <Text>Hello From The Modal!</Text>
                        <Button onPress={() => addItem()} title="Add New Property"></Button>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Property Street Address"
                            onChangeText={newText => setHouseItem({ ...houseItem, name: newText })}
                            value={houseItem.name}
                        />
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Property Post Code"
                            onChangeText={newText => setHouseItem({ ...houseItem, postCode: newText })}
                            value={houseItem.postCode}
                        />
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Property Rental Income"
                            onChangeText={newText => setHouseItem({ ...houseItem, rentalIncome: newText })}
                            value={houseItem.rentalIncome}
                        />
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Property Mortgage Repayment"
                            onChangeText={newText => setHouseItem({ ...houseItem, mortgageRepayment: newText })}
                            value={houseItem.mortgageRepayment}
                        />
                    </View>
                </Modal>
            </View>
            {/*Pass Through HouseItems, Handle Delete Method, Handle Edit Method*/}
            <HouseList houseItems={houseItems}></HouseList>
            <View style={styles.stickyButton} >
                <CustomButton onPress={() => { setModalOpen(true) }}></CustomButton>
            </View>
        </View>
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

