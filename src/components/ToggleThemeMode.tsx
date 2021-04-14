import React, { useContext } from "react";
import { Button } from "react-native";
import { AppContext } from "../components/AppContext";
import { Card } from "./Card";

export default function ToggleThemeMode(): JSX.Element {
  const { toggleMode } = useContext(AppContext);

  return (
    <Card>
      <Button title="toggleTheme" onPress={toggleMode} />
    </Card>
  );
}
