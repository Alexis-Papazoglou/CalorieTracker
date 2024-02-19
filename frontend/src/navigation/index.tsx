import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Calendar from '../screens/Calendar';
import CustomTabBar from './CustomTabBar';


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Calendar" component={Calendar} />
                <Tab.Screen name="ADD">
                    {() => null}
                </Tab.Screen>
                <Tab.Screen name="Settings" component={Home} />
                <Tab.Screen name="Profile" component={Home} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}