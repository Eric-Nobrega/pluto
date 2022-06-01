import HouseItem from "./HouseItem";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from "react";

export default function HouseList(props) {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                {props.houseItems.map((item) => {
                    return (
                        <HouseItem houseID={item.houseID}
                            houseName={item.houseName}
                            housePostCode={item.housePostCode}
                            rentalIncome={item.rentalIncome}
                            mortgageRepayment={item.mortgageRepayment}
                            handleDelete={() => {
                                props.handleDelete(item.houseID);
                              }} />
                    )
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 5,
    },
    body: {

    },
});
