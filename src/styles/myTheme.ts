export interface MyColours {
  foreground: string;
  background: string;
  card: string;
  icon: string;
  input: string;
  placeholder: string;
  buttonForeground: string;
  buttonBackground: string;
  tabActive: string;
  tabInactive: string;
  midGrey: string;
  border: string;
  primary: string;
  secondary: string;
  midBlue: string;
  danger: string;
}

export interface MyBorderRadius {
  button: number;
  card: number;
  input: number;
  modal: number;
  circle: number;
}

export interface MyFontSize {
  body: number;
  display1: number;
  heading1: number;
  heading2: number;
  heading3: number;
  button: number;
  input: number;
  footnote: number;
}

export interface MyOpacity {
  pressed: number;
  disabled: number;
}

export interface MyTheme {
  // id?: string;
  isSmallScreen: boolean;
  lightOrDark: "light" | "dark";
  colors: MyColours;
  borderRadius: MyBorderRadius;
  fontSize: MyFontSize;
  opacity: MyOpacity;
  spacing: number[];
}
