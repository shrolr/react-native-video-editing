import AsyncStorage from '@react-native-community/async-storage';
import FileEditor from './FileEditor';

async function GetItem(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return await JSON.parse(value);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function getVideoPath  (filename:string) {
  return FileEditor.DocumentDirectoryPath + filename + ".mp4";
}

async function setItem(key: string, data: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}


async function RemoveItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

 

export { GetItem, setItem,  RemoveItem,getVideoPath}