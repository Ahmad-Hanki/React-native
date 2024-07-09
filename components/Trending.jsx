import { useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import PPlay from "../assets/icons/play.png";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      duration={500}
      animation={activeItem == item.$id ? zoomIn : zoomOut}
    >
      {play && (
        <>
          <Text className="text-white">playing</Text>
        </>
      )}
      {!play && (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="relative justify-center items-center "
          >
            <ImageBackground
              resizeMode="cover"
              className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
              source={{ uri: item.thumbnail }}
            />

            <Image
              source={PPlay}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      )}
    </Animatable.View>
  );
};

const Trending = ({ post }) => {
  const [activeItem, setActiveItem] = useState(post[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={post}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}

      horizontal
      // makes you swipe
      onViewableItemsChanged={viewableItemsChanged}
      // gets the items anyway

      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      // when do we start apply this itemVisiblePercentThreshold? after what?
      // after 170 px of x
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
