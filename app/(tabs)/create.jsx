import {
  View,
  Text,
  SafeAreaView,
  ScrollViewBase,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import FormField from "../../components/FormField";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import upload from "../../assets/icons/upload.png";
import CustomButton from "../../components/CustomButton";

//
import * as DocumentPicker from 'expo-document-picker'
//

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbNail: null,
    prompt: "",
  });
  const [uploading, setUploading] = useState(false);

  const openPicker = async(selectType) => {
    const res = await DocumentPicker.getDocumentAsync({
      // npm i expo-document-picker
      type:selectType == 'image' ? 
      ['/image/png', '/image/jpg',]
      : ['video/mp4', 'video/gif']
    })


     // user has not canceled
  if(!res.canceled) {
    if (selectType == 'image') {
      setForm({...form, thumbNail:res.assets[0]})
    } else {
      setForm({...form, video:res.assets[0]})
    }
  } else {
    setTimeout(() => {
      Alert.alert('Document Picked', JSON.stringify(res, null, 2))
    }, 100)


    console.log(form.video);
    console.log(form.thumbNail);
  }  
  };

 


  const submit = () => {};
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title={"Video Title"}
          value={form.title}
          placeHolder={"Give your video a title"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
        />

        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form?.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center ">
                  <Image
                    className="w-1/2 h-1/2"
                    source={upload}
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form?.thumbNail ? (
              <Image
                source={{ uri: form.thumbNail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  className="w-5 h-5"
                  source={upload}
                  resizeMode="contain"
                />

                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title={"Ai Prompt"}
          value={form.prompt}
          placeHolder={"Yhe prompt you used"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />

        <CustomButton
          title={"submit and publish"}
          handlePress={submit}
          containerStyle={"mt-7"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
