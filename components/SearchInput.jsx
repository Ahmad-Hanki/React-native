import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";

import search from "../assets/icons/search.png";

const SearchInput = ({
  title,
  value,
  placeHolder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput

        onChangeText={handleChangeText}
        placeholderTextColor={`#7b7b8b`}
        placeholder="Search for a video topic"
        className="flex-1 text-white text-base mt-0.5 font-pregular"
      />

      <TouchableOpacity>
        <Image source={search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
