import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export const Outer = ({
  style,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}): JSX.Element => {
  return <View style={style}>{children}</View>;
};
