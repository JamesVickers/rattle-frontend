// import { DefaultTheme } from "styled-components/native";
import { Dimensions } from "react-native";
import { DefaultTheme } from "styled-components/native";

const isSmallScreen = Dimensions.get("screen").height < 700;

const BASE_FONT_SIZE = 17;

function scaleFontSize(points: number): number {
  return Math.floor((points / BASE_FONT_SIZE) * 16 + 0.5);
}

const spacing = [0, 5, 10, 15, 20, 25, 30, 35, 40, 60, 80];

const baseTheme = {
  borderRadius: {
    button: 9,
    card: 5,
    input: 5,
    modal: 10,
    circle: 200,
  },
  fontSize: {
    body: scaleFontSize(BASE_FONT_SIZE),
    display1: scaleFontSize(34),
    heading1: scaleFontSize(28),
    heading2: scaleFontSize(22),
    heading3: scaleFontSize(20),
    button: scaleFontSize(BASE_FONT_SIZE),
    input: scaleFontSize(BASE_FONT_SIZE),
    footnote: scaleFontSize(13),
  },
  opacity: {
    pressed: 0.5,
    disabled: 0.75,
  },
  spacing: spacing,
};

export const lightTheme: DefaultTheme = {
  isSmallScreen: isSmallScreen,
  lightOrDark: "light",
  colors: {
    foreground: "#171717" /* black */,
    background: "#efefef" /* very light grey */,
    card: "#cfcfcf" /* light grey */,
    icon: "#383838" /* dark grey */,
    input: "#ffffff" /* white */,
    button: "#ffffff" /* white */,
    midGrey: "#cfcfcf" /* mid grey */,
    border: "#cfcfcf" /* light grey */,
    primary: "#ffe000" /* yellow */,
    secondary: "#8cd4ff" /* light blue */,
    midBlue: "#71add1" /* mid blue */,
    danger: "#fa2a2a" /* red */,
  },
  ...baseTheme,
};

export const darkTheme: DefaultTheme = {
  isSmallScreen: isSmallScreen,
  lightOrDark: "dark",
  colors: {
    foreground: "#ffffff",
    background: "#171717",
    card: "#383838",
    icon: "#cfcfcf",
    input: "#171717",
    button: "#171717",
    midGrey: "#cfcfcf",
    border: "#383838",
    primary: "#ffe000",
    secondary: "#8cd4ff",
    midBlue: "#71add1",
    danger: "#fa2a2a",
  },
  ...baseTheme,
};
