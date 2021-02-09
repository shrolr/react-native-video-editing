import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type VideoParamList = {
  Video: undefined;
  
};

export type VideoStackNavProps<T extends keyof VideoParamList> = {
  navigation: StackNavigationProp<VideoParamList, T>;
  route: RouteProp<VideoParamList, T>;
};
