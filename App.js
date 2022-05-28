import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import PageC from './pages/PageC';
import PageD from './pages/PageD';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={PageA} options={{headerShown: false}}/>
        <Tab.Screen name="Cashflow" component={PageB} options={{headerShown: false}}/>
        <Tab.Screen name="Upcoming" component={PageC} options={{headerShown: false}}/>
        <Tab.Screen name="Configure" component={PageD} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
