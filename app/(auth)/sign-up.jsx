import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";
import FormField from "../../components/FormField";
import { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { GlobalContext } from "../../context/GlobalContext";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useContext(GlobalContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);

    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      setLoading(false);
      setIsLoggedIn(true);
      return;
    }

    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
      });
      setUser(result);
      setLoading
      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
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
            Sign up to Auro
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
            title="Sign up"
            handlePress={submit}
            containerStyle={"mt-7"}
            isLoading={loading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              have an account already?
            </Text>
            <Link
              className="text-lg font-psemibold text-secondary"
              href={"/sign-in"}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
