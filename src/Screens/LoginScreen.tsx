import { Button, Form, Input, Item } from 'native-base'
import React, { useState } from 'react'
import { View, Text, Alert, } from 'react-native'
import ActionHelper from '../context/ActionHelper';
import { ActionType } from '../context/reducer';
import { useStateContext } from '../context/state';
import { NetworkResponse, User } from '../models';
import { AuthNavProps } from '../Routes/AuthStackNavigator/AuthParamList';
import { setItem } from '../utilities/functions';


export default function LoignScreen({ navigation }: AuthNavProps<"Login">) {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [state, setstate] = useState({ response: {} as NetworkResponse })
  const { dispatch } = useStateContext();

  const callback = (response: NetworkResponse) => {
    Alert.alert(response.status.toString(), response.data)
    setstate({ response })
  };
  const signInWıthOutNetwork = () => {
    let username = "username"
    let email = "email"
    let user = new User(username, email)
    setItem("auth", user)
    dispatch!({ type: ActionType.SIGN_IN, payload: { user } })

  }
  const onLoginPress = () => {
    ActionHelper.setLogin(username, password, dispatch!, callback)
  }
  const onRegisterPress = () => {
    navigation.navigate("Register")
  }
  const onUserNameChange = (username: string) => {
    setusername(username)
  }
  const onPasswordChange = (password: string) => {
    setpassword(password)
  }
  return (
    <View style={{ justifyContent: "center", alignContent: "center", flex: 1 }}>
      <Form>
        <Item>
          <Input value={username} onChangeText={onUserNameChange} placeholder="Username" />
        </Item>
        <Item last>
          <Input value={password} onChangeText={onPasswordChange} secureTextEntry placeholder="Password" />
        </Item>
        <Button onPress={onLoginPress} full>
          <Text>Login</Text>
        </Button>
        <Button onPress={signInWıthOutNetwork} full>
          <Text>Login with out api call</Text>
        </Button>
      </Form>

      <Button onPress={onRegisterPress} full>
        <Text>Register</Text>
      </Button>
      <Text>{state.response.status + "\n" + state.response.data}</Text>
    </View>
  )
}
