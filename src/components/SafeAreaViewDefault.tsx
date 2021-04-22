import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { useTheme } from "styled-components/native";

export const SafeAreaViewDefault = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const theme = useTheme();

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {children}
    </SafeAreaView>
  );
};
