import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';

export default function Button(props) {
    return (
        <View style={styles.mainContainer}>
            <Image
                style={styles.tinyLogo}
                source={require('../assets/loading.png')}
            />
            <Text style={styles.logoText}>Add A House To Use pLuto</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 100,
        height: 100,
        opacity: 0.65,
        alignSelf: 'center',
        marginTop: 150,
    },
    logoText:{
        alignSelf: 'center',
        fontFamily: 'Raleway_400Regular',
        fontSize: 15,
        opacity: 0.65,
    }
});
