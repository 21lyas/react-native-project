import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tests from "./Tests";
import TestPass from "./TestPass";
import SeeAttempt from "./SeeAttempt";

const Stack = createStackNavigator();

export default function NavigateTest() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        tabBarOptions={{ showLabel: false }}
      >
        <Stack.Screen
          name={"Tests"}
          component={Tests}
          options={{ title: "Тесты" }}
        />
        <Stack.Screen
          name={"TestPass"}
          component={TestPass}
          options={{
            headerLeft: () => null,
            gesturesEnabled: false,
            title: "Пройти тест",
          }}
        />
        <Stack.Screen
          name={"SeeAttempt"}
          component={SeeAttempt}
          options={{
            headerLeft: () => null,
            gesturesEnabled: false,
            title: "Просмотреть попытку",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
