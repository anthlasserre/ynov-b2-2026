import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { Skeleton } from "@/components/skeleton";

const WINDOW_WIDTH = Dimensions.get("window").width;

const fakeArray = Array.from({ length: 10 }, (_, index) => index);

SplashScreen.preventAutoHideAsync();

const loadPosts = async () => {
  console.log("test");
  // simulate delay 5s
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json(),
  );
};

const useIsOnboarded = () => {
  const [value, setValue] = useState(true);
  const { getItem } = useAsyncStorage("onboarded");

  useEffect(() => {
    getItem().then((value) => setValue(Boolean(value)));
  }, []);

  return value;
};

export default function Home() {
  const isOnboarded = useIsOnboarded();

  const { isLoading, isError, data, refetch, isRefetching } = useQuery({
    queryKey: ["items"],
    queryFn: loadPosts,
    staleTime: 60 * 1000 * 5, // 5mn
  });

  const [loaded, error] = useFonts({
    Hiatus: require("../../../assets/fonts/Hiatus.ttf"),
    Montserrat: require("../../../assets/fonts/Montserrat.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // Check de l'état d'onboarding
  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center align-center pt-8 p-4 gap-4">
        {fakeArray.map((item) => (
          <Skeleton key={item} width={WINDOW_WIDTH - 32} height={100} />
        ))}
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-white justify-center align-center">
        <Text className="text-center">Une erreur est survenue</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      data={data}
      contentContainerClassName="gap-4 p-4"
      renderItem={({ item }) => (
        <View className="bg-gray-300 px-4 py-2">
          <Text className="text-xl">{"Test"}</Text>
          <Text className="text-sm">{item.body}</Text>
        </View>
      )}
    />
  );
}
