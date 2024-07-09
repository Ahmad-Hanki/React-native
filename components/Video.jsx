import { View, Text, Image, TouchableOpacity } from "react-native";
import menu from "../assets/icons/menu.png";
import PPlay from "../assets/icons/play.png";

import { useState } from "react";
import { ResizeMode, Video as Vd } from "expo-av";

const Video = ({ video: { title, thumbnail, video, avatar } }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] border border-secondary rounded-lg justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              // important
              className="text-white font-psemibold text-sm"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs text-gray-100 font-pregular"
            >
              {"Togya"}
            </Text>
          </View>
        </View>
        <View className="pt-2 ">
          <Image source={menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>

      {play ? (
        <Vd
          resizeMode={ResizeMode.CONTAIN}
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          useNativeControls
          shouldPlay // plays imminently
          onPlaybackStatusUpdate={(s) => {
            if (s.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={PPlay}
            className="w-12 h-12 absolute "
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Video;
