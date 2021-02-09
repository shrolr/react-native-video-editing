import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "./HomeParamList";
import HomeScreen from "../../Screens/HomeScreen";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator  headerMode="none" initialRouteName="Home">
      <Stack.Screen  name="Home" component={HomeScreen} />

    </Stack.Navigator>
  );
};
