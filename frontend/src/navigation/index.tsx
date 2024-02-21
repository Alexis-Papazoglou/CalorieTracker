import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Calendar from "../screens/Calendar";
import CustomTabBar from "./CustomTabBar";
import SignInScreen from "../screens/AuthenticationScreens/SignInScreen";
import CreateAccountBodyForm from "../screens/AuthenticationScreens/CreateAccountBodyForm";
import CreateAccountAuthDetails from "../screens/AuthenticationScreens/CreateAccountAuthDetails";
import { useAuth } from "../../hooks/useAuth";
import Profile from "../screens/Profile";
import Recipes from "../screens/Recipes/Index";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type RootStackParamList = {
  Main: undefined;
  SignIn: undefined;
  CreateAccountBodyForm: undefined;
  CreateAccountAuthDetails: {
    userDetails: {
      bodyValues: {
        weight: number;
        height: number;
        age: number;
        trainingActivity: string;
        gender: string;
        bodyType: string;
        goal: string;
        timeGoal: string;
      };
    };
    dailyCalories: number;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  ADD: undefined;
  Settings: undefined;
  Profile: undefined;
};

function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="ADD">{() => null}</Tab.Screen>
      <Tab.Screen name="Recipes" component={Recipes} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const auth = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth.user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen
              name="CreateAccountBodyForm"
              component={CreateAccountBodyForm}
            />
            <Stack.Screen
              name="CreateAccountAuthDetails"
              component={CreateAccountAuthDetails}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
