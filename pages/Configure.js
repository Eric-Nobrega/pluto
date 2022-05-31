import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from "react";
import tw from 'twrnc';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';
import Navbar from '../components/Navbar';
import uuid from 'react-native-uuid';


export default function App() {
    // State
    // Item Object
    const [houseItem, setHouseItem] = useState({
        id: uuid.v4(),
        name: "",
        postCode: "",
        rentalIncome: "",
        mortgageRepayment: "",
    });

    // item list
    const [houseItems, setHouseItems] = useState([]);

    function addItem() {
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
            <View style={styles.body}>
                <Text style={{ fontFamily: 'Raleway_100Thin', fontSize: 28 }}>Configure</Text>
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
                <Button title="Create New Property" onPress={() => addItem()} ></Button>
            </View>
            <Text>Current Property Name: {houseItem.name}</Text>
            <Text>Current Property Post Code: {houseItem.postCode}</Text>
            <Text>Current Property Rent: {houseItem.rentalIncome}</Text>
            <Text>Current Property Mortgage: {houseItem.mortgageRepayment}</Text>
            {houseItems.map((item) => {
                return (
                    <View key={item.houseID}>
                        <Text>{item.houseName}</Text>
                        <Text>{item.housePostCode}</Text>
                        <Text>{item.rentalIncome}</Text>
                        <Text>{item.mortgageRepayment}</Text>
                    </View>
                )
            })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    body: {
        paddingTop: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
});
