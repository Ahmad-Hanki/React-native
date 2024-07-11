import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Video from "../../components/Video";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(async () => {
    await searchPosts(query);
  });

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary py-3 h-full">
      <FlatList
        data={posts} // array, same as map
        keyExtractor={(item) => item.$id} // extract the key
        renderItem={({ item }) => <Video video={item} />} // the thing i want to render
        ListHeaderComponent={() => (
          // this one just renderes once!

          <View className="my-16 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        // flat list prop
        ListEmptyComponent={() => (
          // when the list is empty
          <EmptyState
            title={"No Videos Found"}
            subtitle={"No fideos found wwit the search"}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
