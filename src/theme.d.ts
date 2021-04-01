import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultThemeColours {
    font: string;
    screen: string;
    icon: string;
    midGrey: string;
    border: string;
    primary: string;
    secondary: string;
    midBlue: string;
    danger: string;
  }

  // export interface DefaultThemeFontData<T> {
  //   body: T;
  //   post: T;
  //   display1: T;
  //   heading1: T;
  //   heading2: T;
  //   heading3: T;
  //   headline: T;
  //   button: T;
  //   input: T;
  //   hint: T;
  //   footnote: T;
  //   tabBar: T;
  //   navBar: T;
  //   pinCode: T;
  // }

  // export interface DefaultThemeOpacity {
  //   pressed: number;
  //   pressedText: number;
  //   disabled: number;
  // }

  export interface DefaultTheme {
    id?: string;
    darkOrLight?: "dark" | "light";
    // isSmallScreen: boolean;
    colour: DefaultThemeColours;
  }
}
