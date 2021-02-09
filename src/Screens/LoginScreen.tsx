import { Button, Form, Input, Item } from 'native-base'
import React, { useState } from 'react'
import { View, Text, } from 'react-native'
import ActionHelper from '../context/ActionHelper';
import { useStateContext } from '../context/state';
import { AuthNavProps } from '../Routes/AuthStackNavigator/AuthParamList';


export default function LoignScreen({ navigation }: AuthNavProps<"Login">) {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const { dispatch } = useStateContext();

  const signIn = async () => {
  };
  const onLoginPress = () => {
    ActionHelper.setLogin(username, password, dispatch!)
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
      </Form>

      <Button onPress={onRegisterPress} full>
        <Text>Register</Text>
      </Button>
    </View>
  )
}
