import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function StyledButton(props) {
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
        margin: 5,
        borderRadius: 5,
        padding: 7,
        backgroundColor: '#0077FF',
    },
    text: {
        paddingLeft: 2,
        fontSize: 15,
        lineHeight: 21,
        fontFamily: 'Raleway_400Regular',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
    },
});
