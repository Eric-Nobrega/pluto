import { StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from "react";

export default function HouseItemUP(props) {
    function calDaysRemaining(date1, date2) {

        let x = Date.parse(date1)
        let y = date2.getTime()
        // To calculate the time difference of two dates
        var Difference_In_Time = x - y;
        // To calculate the no. of days between two dates
        var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24))

        console.log(x)
        console.log(Date.parse(date1))
        console.log(date1)
        console.log(y)
        console.log(Difference_In_Time)
        console.log(Difference_In_Days)

        return Difference_In_Days
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                <View>
                    <Text style={{ fontSize: "20px", fontSize: 16, fontWeight: "600", paddingHorizontal: 2 }}>{props.houseName}</Text>
                    <Text style={styles.test}></Text>
                    <Text style={{ fontSize: "20px", fontSize: 14, marginTop: 5 , paddingHorizontal: 1, fontWeight: "500" }}>{props.selectedOptionDueDate}</Text>
                </View>
                <View style={styles.bodyRight}>
                    <Text style={{ fontSize: "20px", fontSize: 16, color: "#0077FF", paddingHorizontal: 4 }}>{calDaysRemaining(props.selectedOptionDueDate, new Date())} Days</Text>
                </View>
            </View>
            <View style={styles.bottomBorder}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        color: "black",
        marginTop: 10,
        marginLeft: 13,
        marginRight: 13,
        borderRadius: 5,
        height: 50,
        alignSelf: 'stretch',
        height: 90,
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.12,
        shadowRadius: 1.22,
    },
    body: {
        flex: 1,
        padding: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    bottomBorder: {
        height: 2,
        backgroundColor: "#0077FF",
        opacity: 0.8,
        borderRadius: 5,
    },
    bodyRight: {
        marginLeft: "auto",
    },
    button: {
        color: "red",
        fontWeight: "bold",
    },
    test:{
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 0.2,
        width: 315,
        height: 1,
        marginTop: 4
    }

});
