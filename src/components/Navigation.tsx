import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screens/HomeScreen";
import { UserDetailScreen } from "../screens/UserDetailScreen";

export type RootStackParamList = {
  Home: undefined;
  UserDetails: { login: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "#EFEFEF" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
