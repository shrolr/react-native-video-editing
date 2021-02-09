import axios from 'axios';
import { ServerLink } from '../utilities/constants';
const httpClient = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});
httpClient.defaults.timeout = 15000;


interface IApiCalls { }

interface INetworkResponse {
  status?: number;
  data?: {};
}

class NetworkResponse implements INetworkResponse {
  status: number;
  data: any;
  constructor() {
    this.status = 4;;
    this.data = null;
  }
}

class ApiCalls implements IApiCalls {
  private server_link: string;
  private AXIOS_ERROR: number;
  private AXIOS_OK: number;
  private AXIOS_NO_DATA: number;
  constructor() {
    this.server_link = ServerLink;
    this.AXIOS_ERROR = 0;
    this.AXIOS_OK = 1;
    this.AXIOS_NO_DATA = 2;
  }


  myProfile = async () => {
    let _NetworkResponse = new NetworkResponse()
    let response = await httpClient.post(this.server_link + "me")
    _NetworkResponse.data = response.data;
    _NetworkResponse.status = response.status;
    return _NetworkResponse;


  }

  register = async (name:string,email: string, password: string,) => {

    let _NetworkResponse = new NetworkResponse()
    try {
      let response = await httpClient.post(this.server_link + "users/register", {name, password, email})
      _NetworkResponse.data = response.data;
      _NetworkResponse.status = response.status;
      return _NetworkResponse;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  
  login = async (email:string, password: string) => {
    let _NetworkResponse = new NetworkResponse()
    try {
      let response = await httpClient.post(this.server_link + "users/login", { login:email,password })
      _NetworkResponse.data = response.data;
      _NetworkResponse.status = response.status;
      return _NetworkResponse;
    } catch (error) {
      console.log(error)
      return false;
    }

  }
 


}

export default new ApiCalls();