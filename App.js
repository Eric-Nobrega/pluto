import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import Navbar from './components/Navbar';
import AppLoading from 'expo-app-loading';
import { useFonts, Raleway_100Thin } from '@expo-google-fonts/raleway';

export default function App() {
  let [fontsLoaded] = useFonts({
    Raleway_100Thin,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.mainContainer}>
      <Navbar></Navbar>
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
