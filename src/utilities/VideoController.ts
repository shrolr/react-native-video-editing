import FileEditor from "./FileEditor";
import VideoEditor from "./VideoEditor";
import { Video as VideoModel } from 'react-native-image-crop-picker';
import { v4 as uuidv4 } from 'uuid';
import { VideoInfo } from "../models";
import { GetItem, setItem } from "./functions";
import { Platform } from "react-native";


const createTextFileContent = (Videos: VideoModel[]) => {
    let textFileContent = ""
    Videos.map(vid => {
        let path = Platform.OS === "android" ? vid.path : vid.sourceURL
        textFileContent += 'file ' + path + "\n"
    }
    )
    return textFileContent
}
const getSceenShots = async (Videos: VideoModel[], screenShotFolderName: string) => {
    let identifierIndex = 0;
    for await (const video of Videos) {
        if (video.path) {
            await VideoEditor.genareteThumbNails(video.path, FileEditor.DocumentDirectoryPath + screenShotFolderName, identifierIndex.toString())
        }
        identifierIndex++;
    }
}
const handleSelectedVideoes = async (Videos: VideoModel[], callBack: (thumbNails: string[]) => void) => {
    let videoNameAndPath = uuidv4();
    let screenShotFolderName = videoNameAndPath + "/"
    await FileEditor.createFolder(screenShotFolderName)
    await getSceenShots(Videos, screenShotFolderName)
    let thumbNails = await FileEditor.getThumbNails(FileEditor.DocumentDirectoryPath + screenShotFolderName)
    callBack(thumbNails)
}

const getVideos = async () => {
    let videos: VideoInfo[] = await GetItem("videos")
    return videos
}

const saveVideo = async (Videos: VideoModel[]) => {
    let videoNameAndPath = uuidv4();

    let textFile = FileEditor.DocumentDirectoryPath + videoNameAndPath + ".txt";
    let videoFileName = videoNameAndPath + ".mp4"

    await FileEditor.writeFile(textFile, createTextFileContent(Videos))
    await VideoEditor.concatVideo(textFile, videoFileName)
    let _videoInfo: VideoInfo = new VideoInfo(videoNameAndPath)

    let videos = await getVideos();
    if (videos) {
        videos.push(_videoInfo)
        await setItem("videos", videos)
    }
    else {
        videos = [];
        videos.push(_videoInfo)
        await setItem("videos", videos)
    }
    return videos;
}
export { handleSelectedVideoes, saveVideo, getVideos }