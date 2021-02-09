import React, { useEffect, useRef } from 'react'
import { Image, Platform } from 'react-native';

interface IThumbnailCard {
    path: string;
}

export const ThumbnailCard: React.FC<IThumbnailCard> = ({ path }) => {
    console.log(path)
    return (    
        <Image 
            resizeMode="cover"
            source={{ uri: Platform.OS === "android" ?  "file:" + path : path }}
            
            style={{ height: 100, width: 100 }} />
    );
};