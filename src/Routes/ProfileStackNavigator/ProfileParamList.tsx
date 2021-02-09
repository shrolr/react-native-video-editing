import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type ProfileParamList = {
  Profile:undefined;
  Media:undefined;
  Interest:{setGender(gender:number): void};
  InterestTypes:undefined;
  EditProfile:undefined;

};

export type ProfileStackNavProps<T extends keyof ProfileParamList> = {
  navigation: StackNavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};
