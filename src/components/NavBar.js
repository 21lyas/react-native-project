import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NavigateTest from "../pages/navigate";
import NavigateStudent from "../pages/navigateStudent";

const Tab = createBottomTabNavigator();

export default function TabNavigate({ navigation }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{ showLabel: false }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
          }}
          name="student"
          component={NavigateStudent}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={30} />
            ),
          }}
          name="tests"
          component={NavigateTest}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
