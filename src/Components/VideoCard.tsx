import { Card } from 'native-base';
import React, { useEffect, useRef } from 'react'
import { Image } from 'react-native';
import Video from 'react-native-video';
import { getVideoPath } from '../utilities/functions';

interface IVideoCard {
    path: string;
}

export const VideoCard: React.FC<IVideoCard> = ({ path }) => {

    return (
        <Card>
            <Video
                resizeMode="cover"
                source={{ uri: getVideoPath(path) }}
                repeat
                style={{ height: 300, flex:1 }} />
        </Card>
    );
};