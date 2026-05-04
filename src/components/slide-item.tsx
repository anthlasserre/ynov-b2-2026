import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
const SLIDE_ITEM_WIDTH = Dimensions.get("screen").width;

interface SlideItemProps {
  isActive: boolean;
  backgroundImage: ImageSourcePropType;
  title: string;
  body: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit?: () => Promise<void>;
}

export default function SlideItem({
  isActive,
  backgroundImage,
  title,
  body,
  submitLabel,
  isSubmitting,
  onSubmit,
}: SlideItemProps) {
  const animatedValue = useDerivedValue(() => {
    return isActive ? 1 : 0;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedValue.value, { duration: 1000 }),
    };
  });

  return (
    <View className="bg-black flex-1" style={{ width: SLIDE_ITEM_WIDTH }}>
      <Animated.View
        className="absolute top-0 left-0 w-full h-full bg-black opacity-0"
        style={animatedStyle}
      >
        <Image
          source={backgroundImage}
          className="w-full h-full object-cover bg-black"
        />
      </Animated.View>

      <View
        className="gap-4 flex-1"
        style={{
          justifyContent: "flex-end",
          paddingBottom: 48,
          paddingHorizontal: 32,
        }}
      >
        <View>
          <Text style={styles.body} numberOfLines={1} adjustsFontSizeToFit>
            {title}
          </Text>
          <Text style={styles.body2} numberOfLines={1} adjustsFontSizeToFit>
            {body}
          </Text>
        </View>
        {onSubmit && submitLabel ? (
          <TouchableOpacity
            onPress={onSubmit}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#176FF2",
              justifyContent: "center",
              borderRadius: 16,
              paddingVertical: 12,
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text style={styles.ctaLabel}>{submitLabel}</Text>
            {isSubmitting && <ActivityIndicator color="white" />}
          </TouchableOpacity>
        ) : (
          <View style={{ height: 45 }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    fontFamily: "Montserrat",
    fontSize: 24,
    color: "white",
  },
  body2: {
    fontFamily: "Montserrat-Medium",
    fontSize: 40,
    color: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ctaLabel: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 16,
  },
});
