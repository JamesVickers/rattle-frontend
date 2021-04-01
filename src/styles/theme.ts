import { DefaultTheme } from "styled-components/native";

export const lightTheme: DefaultTheme = {
  id: 1,
  darkOrLight: "light",
  colour: {
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
  },
};

export const darkTheme: DefaultTheme = {
  id: 2,
  darkOrLight: "dark",
  colour: {
    // white
    foreground: "#ffffff",
    // darkGrey
    background: "#383838",
    icon: "#efefef",
    // midGrey
    midGrey: "#cfcfcf",
    // black
    border: "#171717",
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
