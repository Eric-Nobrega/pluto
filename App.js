import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PageA from './pages/Homepage';
import PageB from './pages/Cashflow';
import PageC from './pages/Upcoming';
import PageD from './pages/Configure';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={PageA}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Cashflow"
          component={PageB}
          options={{
            tabBarLabel: 'Cashflow',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-stats-chart-sharp" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Upcoming"
          component={PageC}
          options={{
            tabBarLabel: 'Upcoming',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Configure"
          component={PageD}
          options={{
            tabBarLabel: 'Configure',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
