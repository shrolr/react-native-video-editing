import React, { useEffect, useState } from "react";
import { View, Text, Image, Platform, FlatList, SafeAreaView } from "react-native";
import { HomeStackNavProps } from "../Routes/HomeStackNavigator/HomeParamList";

import { useStateContext } from "../context/state";
import { getVideos } from "../utilities/VideoController";
import { ActionType } from "../context/reducer";
import { VideoCard } from "../Components";

function HomeScreen({ navigation }: HomeStackNavProps<"Home">) {
  const { context, dispatch } = useStateContext();
  useEffect(() => {
    loadSavedVideos()

  }, [])
  const loadSavedVideos = async () => {
    
    let videos = await getVideos();
    if(dispatch){
      dispatch({ type: ActionType.SET_VIDEOS, payload: { videos } })
    }
  }
  return (
    <SafeAreaView style={{ justifyContent: "center", alignContent: "center", flex: 1 }}>
      <FlatList 
        data={context.videos}
        renderItem={({ item}) => (
          <VideoCard path={item.path} />
        )}
        keyExtractor={item => item.path}
      />
      
    </SafeAreaView>
  )
}

export default HomeScreen;
