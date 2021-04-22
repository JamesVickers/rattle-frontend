import React, { useContext } from "react";
import { Switch } from "react-native";
import { useTheme } from "styled-components/native";
import { AppContext } from "./AppContext";
import { TextStyles } from "./TextStyles";

export default function ToggleThemeSwitch(): JSX.Element {
  const { toggleMode } = useContext(AppContext);
  const theme = useTheme();

  const isEnabled = theme.lightOrDark === "dark";

  return (
    <>
      <TextStyles>Switch theme</TextStyles>
      <Switch
        trackColor={{
          false: "",
          true: theme.colors.foreground,
        }}
        thumbColor={
          isEnabled ? theme.colors.background : theme.colors.foreground
        }
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleMode}
        value={isEnabled}
      />
    </>
  );
}
