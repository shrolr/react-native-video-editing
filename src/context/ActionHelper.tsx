import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "../models";
import ApiCalls from "../network/ApiCalls";
import { AuthParamList } from "../Routes/AuthStackNavigator/AuthParamList";
import { AXIOS_OK, SERVER_AUTH_FAILED } from "../utilities/constants";
import { setItem } from "../utilities/functions";
import { Action, ActionType } from "./reducer";

class ActionHelper {

    setLogin = async (email: string, password: string, dispatch: React.Dispatch<Action>, navigation?: StackNavigationProp<AuthParamList, "Login">) => {
        ApiCalls.login(email, password).then((response) => {
            if (response) {
                if(response.status === SERVER_AUTH_FAILED){
                    // auth error alert 
                    return
                }
                if (response.data) {
                    let username = response.data.name
                    let email = response.data.email
                    let user = new User(username, email)
                    setItem("auth", user)
                    dispatch({ type: ActionType.SIGN_IN, payload: { user } })
                }
            }
            else {
                // TO DO WARNİNG
            }
        })
    }



    register = async (username: string, password: string, email: string, dispatch: React.Dispatch<Action>, navigation: StackNavigationProp<AuthParamList, "Register">) => {

        ApiCalls.register(username, email, password,).then((response) => {
            if (response) {
                if(response.status === SERVER_AUTH_FAILED){
                    // auth error alert 
                    return
                }
                if (response?.data) {
                    let user = new User(username, email)
                    setItem("auth", user)
                    dispatch({ type: ActionType.SIGN_IN, payload: { user } })
                }
            }
        })
    }


}

export default new ActionHelper();