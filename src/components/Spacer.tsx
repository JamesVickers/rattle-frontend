import React from "react";
import { View } from "react-native";

export default function Spacer({
  width,
  height,
}: {
  width?: number;
  height?: number;
}): JSX.Element {
  return <View style={{ width, height }} />;
}
