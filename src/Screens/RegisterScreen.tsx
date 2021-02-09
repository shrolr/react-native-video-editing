import { Button, Text, View, Form, Item, Input } from 'native-base';
import React, { useState } from 'react'
import ActionHelper from '../context/ActionHelper';
import { useStateContext } from '../context/state';
import { AuthNavProps } from '../Routes/AuthStackNavigator/AuthParamList';



export default function RegisterScreen({ navigation }: AuthNavProps<"Register">) {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const { dispatch } = useStateContext();


    const onBackPress = () => {
        navigation.goBack()
    }
    const onRegisterPress = () => {
        ActionHelper.register(username,password,email,dispatch!,navigation)
    }
    const onUserNameChange = (username: string) => {
        setusername(username)
    }
    const onEmailChange = (email: string) => {
        setemail(email)
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
                <Item>
                    <Input textContentType="emailAddress" value={email} onChangeText={onEmailChange} placeholder="Email" />
                </Item>
                <Item last>
                    <Input value={password} onChangeText={onPasswordChange} secureTextEntry placeholder="Password" />
                </Item>
                <Button onPress={onRegisterPress} full>
                    <Text>Register</Text>
                </Button>
            </Form>

            <Button onPress={onBackPress} full>
                <Text>Go Back</Text>
            </Button>
        </View>

    )
}
