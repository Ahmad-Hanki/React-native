import { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native";

import eyeHide from "../assets/icons/eye-hide.png";
import eye from "../assets/icons/eye.png";

const FormField = ({
  title,
  value,
  placeHolder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 text-base font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          secureTextEntry={title == "Password" && !showPassword}
          // hide password

          onChangeText={handleChangeText}
          placeholderTextColor={`#7b7b8b`}
          placeholder={placeHolder}
          className="flex-1 text-white font-psemibold text-base"
        />

        {title == "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              resizeMode="contain"
              className="w-6 h-6"
              source={!showPassword ? eye : eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
