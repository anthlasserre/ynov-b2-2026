import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import SlideItem from "@/src/components/slide-item";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Onboarding() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { top, bottom } = useSafeAreaInsets();

  const onPressExplore = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await AsyncStorage.setItem("onboarded", "true");
      return router.replace("/");
    } finally {
      setIsSaving(false);
    }
  };

  const data = [
    {
      title: "Watch",
      body: "Popular Places",
      backgroundImage: require("../assets/bg-onboarding.png"),
    },
    {
      title: "Plan Your",
      body: "Luxury Vacations",
      backgroundImage: require("../assets/bg-onboarding-2.png"),
    },
    {
      backgroundImage: require("../assets/bg-onboarding-3.png"),
      title: "Book",
      body: "In Seconds",
      onSubmit: onPressExplore,
      isSubmitting: isSaving,
      submitLabel: "Explore",
    },
  ];

  const onScroll = (event: any) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(xPosition / totalWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const isLastIndex = data.length - 1 === activeIndex;

  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={data}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={20}
        renderItem={({ item, index }) => (
          <SlideItem {...item} isActive={index === activeIndex} />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <View
        className="flex-1 absolute top-0 left-0 right-0"
        style={{
          paddingTop: top + 20,
          paddingBottom: bottom,
          paddingHorizontal: 32,
        }}
      >
        <Text style={styles.title}>{"Aspen"}</Text>
      </View>
      {!isLastIndex && (
        <View className="absolute flex-row bottom-0 left-0 w-full items-center justify-center gap-2 pb-12">
          {data.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full bg-white ${activeIndex === index ? "bg-white" : "bg-white opacity-50"}`}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Hiatus",
    fontSize: 116,
    color: "white",
    textAlign: "center",
  },
});
