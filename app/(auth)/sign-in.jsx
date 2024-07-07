import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signin } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalContext";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");

      setLoading(false);
      return;
    }

    try {
      const result = await signin(form.email, form.password);
      setIsLoggedIn(true);
      setUser(result);
      router.replace("/home");
    } catch (err) {
      // becaus off the limitation error:
      router.replace("/home");
      Alert.alert("Error", "Something went wrong" + err);
    }

    setLoading(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 ">
            Log in to Auro
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyle={"mt-7"}
            isLoading={loading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't an have account?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href={"/sign-up"}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
