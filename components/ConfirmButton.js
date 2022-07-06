import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function ConfirmButton(props) {
    const { onPress, title = '+' } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={[styles.text]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "auto",
        height: "auto",
        margin: 2,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        color: "#0077FF",
        fontWeight: "normal"
    },
});
