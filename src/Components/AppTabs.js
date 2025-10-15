import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test123 from './Home';
import SettingsScreen from './SettingScreen';
import CategoryGraph from './CategoryGraph';
import MonthlyGraph from './MonthlyGraph';


const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Test123} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="graph1" component={CategoryGraph} />
      <Tab.Screen name="graph2" component={MonthlyGraph} />
    </Tab.Navigator>
  );
}
