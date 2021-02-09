import { Button, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, Platform, SafeAreaView } from 'react-native'
import { VideoStackNavProps } from '../Routes/VideoStackNavigator/VideoParamList';
import ImagePicker, { Video as VideoModel } from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import { ThumbnailCard } from '../Components';
import { handleSelectedVideoes, saveVideo } from '../utilities/VideoController';
import { human } from 'react-native-typography';
import { useStateContext } from '../context/state';
import { ActionType } from '../context/reducer';


export default function NewVideoScreen({ navigation }: VideoStackNavProps<"Video">) {
    const [state, setstate] = useState({ Videos: [] as VideoModel[] })
    const [index, setindex] = useState(0)
    const [loading, setloading] = useState(true)
    const [thumbnails, setthumbnails] = useState({ thumbNails: [] as string[] })
    const [processingVideo, setprocessingVideo] = useState(false)
    const { dispatch } = useStateContext();

    useEffect(() => {
        PromptVideoSelector()
    }, [])
    const PromptVideoSelector = () => {
        ImagePicker.openPicker({
            multiple: true,
            minFiles: 2,
            maxFiles: 5,
            mediaType: "video",
        }).then((video) => {
            let Videos: VideoModel[] = [];

            if (video) {
                video.forEach(_video => {
                    Videos.push(_video as VideoModel)
                });
                setstate({ Videos })
                handleSelectedVideoes(Videos, callBackSelectedVideos)
            }
        })
    }
    const callBackSelectedVideos = (thumbNails: string[]) => {
        setthumbnails({ thumbNails })
        setloading(false)
    }

    const playNextVideo = () => {
        if (index === state.Videos.length - 1) {
            setindex(0)
            return
        }
        setindex(index + 1)
    }

    const onSaveVideoPress = async () => {
        if (!processingVideo) {
            setprocessingVideo(true)
            let videos = await saveVideo(state.Videos)
            dispatch!({ type: ActionType.SET_VIDEOS, payload: { videos } })
            navigation.navigate("Home")
        }


    }
    return (
        <SafeAreaView style={{ backgroundColor: "black", flex: 1, paddingTop: 10 }}>
            {
                processingVideo && <Spinner />
            }
            {state.Videos.length > 0 &&
                <Video
                    resizeMode="contain"
                    source={{ uri: Platform.OS === "android" ?  state.Videos[index].path :state.Videos[index].sourceURL  }}
                    onEnd={playNextVideo}
                    paused={processingVideo}
                    style={{ flex: 1 }} />
            }
            {loading === true ?
                <View style={{ flex: 1, backgroundColor: "#222" }}>
                    <Text style={human.title1White}>generating thumbnails</Text>
                    <Spinner />
                </View>
                :
                <View style={{ flex: 1, backgroundColor: "#222" }}>
                    <FlatList horizontal
                        data={thumbnails.thumbNails}
                        renderItem={({ item }) => (
                            <ThumbnailCard path={item} />
                        )}
                        keyExtractor={item => item}
                    />
                    <Button onPress={onSaveVideoPress} full>
                        <Text>Save Video</Text>
                    </Button>
                </View>

            }
        </SafeAreaView>
    )
}
