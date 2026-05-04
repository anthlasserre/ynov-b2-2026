import React, { useEffect } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_COLORS = ["#E0E0E0", "#F0F0F0"] as [string, string];

interface SkeletonProps {
  width: number;
  height: number;
  colors?: [string, string];
}

export const Skeleton = ({
  width,
  height,
  colors = DEFAULT_COLORS,
  ...props
}: SkeletonProps) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(animatedValue.value, [0, 1], colors),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: 16,
          backgroundColor: "gray",
        },
        animatedStyle,
      ]}
    />
  );
};
