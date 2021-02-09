import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from "./AppParamList";

import { HomeStack } from "../HomeStackNavigator/HomeStack";
import { ProfileStack } from "../ProfileStackNavigator/ProfileStack";

import { Text } from "native-base";
import {  VideoStack } from "../VideoStackNavigator/VideoStack";
import AppTheme from "../../res/colors";

interface AppTabsProps { }

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({ }) => {

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <Text>Home</Text>
          }  
          else if (route.name === "Video") {
            return <Text>Video</Text>
          }
          else if (route.name === "Profile") {
            return <Text>Profile</Text>
          }
        },
        header: null,
      })}
      tabBarOptions={{
        activeTintColor: AppTheme.Primary,
        inactiveTintColor: AppTheme.Secondary,
        inactiveBackgroundColor: "#fff",
        activeBackgroundColor: "#fff",
        style: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
        }
      }}
    >
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Video" component={VideoStack} />
      <Tabs.Screen name="Profile" component={ProfileStack} />
    </Tabs.Navigator>
  );
};
