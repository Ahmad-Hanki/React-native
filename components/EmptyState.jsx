import { View, Text, Image } from "react-native";
import empty from "../assets/images/empty.png";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>

      <CustomButton
      title={'Create video'}
      handlePress={() => router.push('/create')}
      containerStyle={'w-full my-5'}
      />
    </View>
  );
};

export default EmptyState;
