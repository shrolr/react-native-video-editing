import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { VideoParamList } from "./VideoParamList";
import NewVideoScreen from "../../Screens/NewVideoScreen";


interface VideoStackProps { }

const Stack = createStackNavigator<VideoParamList>();

export const VideoStack: React.FC<VideoStackProps> = ({ }) => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Video">
      <Stack.Screen name="Video" component={NewVideoScreen} />


    </Stack.Navigator>
  );
};
