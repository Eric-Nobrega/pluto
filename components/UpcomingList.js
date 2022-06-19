import HouseItem from "./HouseItem";
import HouseItemUP from "./HouseItemUP";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from "react";

export default function UpcomingList(props) {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                {props.houseItems.map((item) => {
                    return (
                        <HouseItemUP
                            key={item.houseID}
                            houseID={item.houseID}
                            houseName={item.houseName}
                            housePostCode={item.housePostCode}
                            rentalIncome={item.rentalIncome}
                            mortgageRepayment={item.mortgageRepayment}
                            profit={item.profit} />
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
