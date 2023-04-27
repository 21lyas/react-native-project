import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StudentProfile from "./StudentProfile";
import SeeAttemptStudent from "./SeeAttemptStudent";

const Stack = createStackNavigator();

export default function NavigateStudent() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{ showLabel: false }}
      >
        <Stack.Screen
          name={"StudentProfile"}
          component={StudentProfile}
          options={{ title: "StudentProfile" }}
        />
        <Stack.Screen
          name={"SeeAttemptStudent"}
          component={SeeAttemptStudent}
          options={{ title: "SeeAttemptStudent" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
