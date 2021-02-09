/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'; // TO DO check this if its working or not 
AppRegistry.registerComponent(appName, () => App);
