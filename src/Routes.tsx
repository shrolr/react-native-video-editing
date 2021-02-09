import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./Routes/AppTabNavigator/AppTabs";
import { AuthStack } from "./Routes/AuthStackNavigator/AuthStack";
import { useStateContext } from "./context/state";
import { GetItem, RemoveItem } from "./utilities/functions";
import { Spinner } from "native-base";
import ActionHelper from "./context/ActionHelper";
import { ActionType } from "./context/reducer";

interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
  const { context, dispatch } = useStateContext();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    checkAuth()
  }, [])
  const checkAuth = async () => {
    let user = await GetItem("auth")
    if (user) {
      setLoading(false)
      dispatch!({ type: ActionType.SIGN_IN,payload:{user} })
    }
    else {
      setLoading(false)
    }
  }
  const { isAuthenticated } = context;
  if (loading) {
    return <Spinner />
  }
  return (
    <NavigationContainer>
      { isAuthenticated  ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
