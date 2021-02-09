import FileEditor from "../utilities/FileEditor";

interface IVideoInfo {
    path: string;
}

export class VideoInfo implements IVideoInfo {
    readonly path: string;
    constructor(path: string) {
        this.path = path;
    }
   
}

