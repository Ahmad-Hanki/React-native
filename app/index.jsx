import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "../assets/images/logo.png";
import cards from "../assets/images/cards.png";
import path from "../assets/images/path.png";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          // so they be able to scroll
          height: "100%",
        }}
      >
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image
            source={logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5 ">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibility with{" "}
              <Text className="text-secondary-200">Aora</Text>{" "}
            </Text>
            <Image
              source={path}
              resizeMode="contain"
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
      {/* clock and the time and all */}
    </SafeAreaView>
  );
}
