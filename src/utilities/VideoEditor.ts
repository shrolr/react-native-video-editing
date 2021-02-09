import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg';
import FileEditor from './FileEditor';


interface IVideoEditor {
    concatVideo: (TextFilepath: string, outPutPath: string) => Promise<void>,
    genareteThumbNails: (videoPath: string, outPutPath: string,identifier:string) => Promise<void>
}

class VideoEditor implements IVideoEditor {

    public concatVideo = async (TextFilepath: string, videoName: string) => {
        try {
            let result = await RNFFmpeg.execute('-f concat -safe 0  -i ' + TextFilepath + ' -vf transpose=1  -c:v mpeg4 ' + FileEditor.DocumentDirectoryPath + videoName )
            console.log(`FFmpeg process exited with rc=${result}.`)
        } catch (error) {
            // handle error
        }

    }
    public genareteThumbNails = async (videoPath: string, outPutPath: string,identifier:string) => {
        try {
            let result = await RNFFmpeg.execute('-i ' + videoPath + ' -vf fps=1 ' + outPutPath +identifier+ "%d.png")
            console.log(`FFmpeg process exited with rc=${result}.`)

        } catch (error) {
            // handle error
        }

    }

}

export default new VideoEditor();


