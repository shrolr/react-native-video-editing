import { Platform } from "react-native";
import { screenshotTime } from "./constants";

var RNFS = require('react-native-fs');

interface IFileEditor {
    writeFile: (path: string, text: string) => Promise<void>,
    getThumbNails: (path: string) => Promise<string[]>,
    createFolder: (folderName: string, path: string) => Promise<void>,
    DocumentDirectoryPath: string
}

class FileEditor implements IFileEditor {
    DocumentDirectoryPath: string = RNFS.DocumentDirectoryPath + "/";

    public createFolder = async (folderName: string) => {
        try {
            await RNFS.mkdir(this.DocumentDirectoryPath + folderName)
        } catch (error) {
            // handle error
        }
    }

    public writeFile = async (path: string, text: string) => {
        try {
            await RNFS.writeFile(path, text, 'utf8')
        } catch (error) {
            // handle error
        }

    }

    public getThumbNails = async (path: string) => {
        let thumbNails: string[] = [];
        let index = 1;
        try {
            let result = await RNFS.readDir(path);
            if(Platform.OS === "android") {
                result = result.sort((a:any,b:any)=> a.mtime - b.mtime)
            }
            else {
                result = result.sort((a:any,b:any)=> a.ctime - b.ctime)
            }
            result.map((res: any) => {

                let path:string = res.path
                if(path.includes(".png")){
                    if(index === screenshotTime){
                        thumbNails.push(path)
                        index=0;
                    }
                    index++;
                }
               
            })
        } catch (error) {
            // handle error
        }
        console.log(thumbNails)

         return thumbNails

    }

}
export default new FileEditor();
