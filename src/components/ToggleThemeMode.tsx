import React, { useContext } from "react";
import { Button, View } from "react-native";
import { AppContext } from "../components/AppContext";

export default function ToggleThemeMode(): JSX.Element {
  const { toggleMode } = useContext(AppContext);

  return (
    <View style={{ backgroundColor: "white" }}>
      <Button title="toggleTheme" onPress={toggleMode} />
    </View>
  );
}
