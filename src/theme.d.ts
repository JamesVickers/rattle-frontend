import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colours: {
      font: string;
      screen: string;
      icon: string;
      midGrey: string;
      border: string;
      primary: string;
      secondary: string;
      midBlue: string;
      danger: string;
    };
  }
}
