import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect } from "react";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import Video from "../../components/Video";
import { GlobalContext } from "../../context/GlobalContext";

import logout from "../../assets/icons/logout.png";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useContext(GlobalContext);
  const { data: posts } = useAppwrite(async () => {
    await getUserPosts(user.$id);
  });

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
  };
  return (
    <SafeAreaView className="bg-primary py-3 h-full">
      <FlatList
        data={posts} // array, same as map
        keyExtractor={(item) => item.$id} // extract the key
        renderItem={({ item }) => <Video video={item} />} // the thing i want to render
        ListHeaderComponent={() => (
          // this one just renderes once!

          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={handleLogout}
            >
              <Image source={logout} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>

            <View className="w-16 h-16 border- border-secondary rounded-lg justify-center items-center">
              <Image
                source={logout} // avatar
                className="w-[90%] h-[90%] rounded-lg "
                resizeMode="cover"
              />

              <InfoBox
                title={"Togya"}
                containerStyles={"mt-5"}
                titleStyles={"text-lg"}
              />

              <View className="mt-5 flex-row ">
                <InfoBox
                  title={"3"}
                  subtitle={"posts"}
                  containerStyles={"mr-5"}
                  titleStyles={"text-xl"}
                />
                <InfoBox
                  title={"1.2k"}
                  subtitle={"followers"}
                  titleStyles={"text-xl"}
                />
              </View>
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

export default Profile;
