import { DefaultTheme } from "styled-components/native";

const theme: DefaultTheme = {
  // id: 1,
  // isSmallScreen: boolean;
  colors: {
    // black
    foreground: "#171717",
    // lightGrey
    background: "#efefef",
    // darkGrey
    icon: "#383838",
    // midGrey
    midGrey: "#cfcfcf",
    // white
    border: "#ffffff",
    // primary
    primary: "#ffe000",
    // lightBlue
    secondary: "#8cd4ff",
    // midBlue
    midBlue: "#71add1",
    // danger
    danger: "#fa2a2a",
    modes: {
      dark: {
        foreground: "#ffffff",
        background: "#383838",
        icon: "#efefef",
        midGrey: "#cfcfcf",
        border: "#171717",
        primary: "#ffe000",
        secondary: "#8cd4ff",
        midBlue: "#71add1",
        danger: "#fa2a2a",
      },
      tropical: {
        foreground: "#171717",
        background: "#99d9ff",
        icon: "#efefef",
        midGrey: "#cfcfcf",
        border: "#171717",
        primary: "#ffe000",
        secondary: "#8cd4ff",
        midBlue: "#71add1",
        danger: "#fa2a2a",
      },
    },
  },
};

const modes = Object.keys(theme.colors.modes).map((key) => key);

modes.unshift("default");

export { theme, modes };
