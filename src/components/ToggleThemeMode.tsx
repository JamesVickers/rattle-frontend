import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AppContext } from "../components/AppContext";

export default function ToggleThemeMode(): JSX.Element {
  const { mode, toggleMode } = useContext(AppContext);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>Theme: {mode}</Text>
      <Button title="toggleTheme" onPress={toggleMode} />
    </View>
  );
}
