import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import logoSmall from "../../assets/images/logo-small.png";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const [refreshing, setRefreshing] = useState();

  const onRefresh = async () => {
    setRefreshing(true);
    //recall videos
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary py-3 h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]} // array, same as map
        keyExtractor={(item) => item.$id} // extract the key
        renderItem={({ item }) => (
          <Text className="text-3xl text-white ">{item.id}</Text>
        )} // the thing i want to render
        ListHeaderComponent={() => (
          // flat list prop

          <View className="my-10 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Togya
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mt-3">
                Latest videos
              </Text>
              <Trending post={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        // flat list prop
        ListEmptyComponent={() => (
          // when the list is empty
          <EmptyState
            title={"No Videos Found"}
            subtitle={"Be the first one to upload video!"}
          />
        )}
        // flat list prop
        // you can scroll app so you can refresh! beautiful.
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
