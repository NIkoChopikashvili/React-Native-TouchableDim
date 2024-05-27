import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const TouchableDim = ({ children, onPress }) => {
  const overlayOpacity = useSharedValue(0);

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  const handlePressIn = () => {
    overlayOpacity.value = withTiming(0.5, { duration: 150 });
  };

  const handlePressOut = () => {
    overlayOpacity.value = withTiming(0, { duration: 150 });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <View style={styles.btn}>
        {children}
        <Animated.View style={[styles.overlay, animatedOverlayStyle]} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "pink",
  },
  btn: {
    borderRadius: 10,
    width: 100,
    height: 50,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TouchableDim;
