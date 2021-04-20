export interface MyColours {
  foreground: string;
  background: string;
  card: string;
  icon: string;
  midGrey: string;
  border: string;
  primary: string;
  secondary: string;
  midBlue: string;
  danger: string;
}

export interface MyTheme {
  // id?: string;
  // isSmallScreen: boolean;
  lightOrDark: "light" | "dark";
  colors: MyColours;
}
