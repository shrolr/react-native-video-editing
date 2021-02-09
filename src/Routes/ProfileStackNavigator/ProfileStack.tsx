import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileParamList } from "./ProfileParamList";
import ProfileScreen from "../../Screens/ProfileScreen";

interface ProfileStackProps {}

const Stack = createStackNavigator<ProfileParamList>();

export const ProfileStack: React.FC<ProfileStackProps> = ({}) => {
  return (
    <Stack.Navigator  headerMode="none" initialRouteName="Profile">
      <Stack.Screen  name="Profile" component={ProfileScreen} />
     

    </Stack.Navigator>
  );
};
