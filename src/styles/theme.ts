import { DefaultTheme } from "styled-components/native";

export const lightTheme: DefaultTheme = {
  lightOrDark: "light",
  colors: {
    // black
    foreground: "#171717",
    // lightGrey
    background: "#efefef",
    // white
    card: "#ffffff",
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
  },
};

export const darkTheme: DefaultTheme = {
  lightOrDark: "dark",
  colors: {
    foreground: "#ffffff",
    background: "#383838",
    card: "#171717",
    icon: "#efefef",
    midGrey: "#cfcfcf",
    border: "#171717",
    primary: "#ffe000",
    secondary: "#8cd4ff",
    midBlue: "#71add1",
    danger: "#fa2a2a",
  },
};
