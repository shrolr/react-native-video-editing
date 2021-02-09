import { Button } from 'native-base';
import React from 'react'
import { Text, View, } from 'react-native'
import { ActionType } from '../context/reducer';
import { useStateContext } from '../context/state';
import { ProfileStackNavProps } from '../Routes/ProfileStackNavigator/ProfileParamList';
import { RemoveItem } from '../utilities/functions';

export default function ProfileScreen({ navigation }: ProfileStackNavProps<"Profile">) {

    const { context, dispatch } = useStateContext();

    const onLogoutPress = () => {   
        RemoveItem("auth").then(()=> {
            dispatch!({type:ActionType.SIGN_OUT})
        })
    }
    return (
        <View style={{ alignItems:"center", justifyContent: "center", flex: 1 }}>
            <Text>{context.user?.email}</Text>
            <Text>{context.user?.username}</Text>
            <Button onPress={onLogoutPress} full>
                <Text>Logout</Text>
            </Button>
        </View>
    )
}
