import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript";
import { Id } from "./state/types";

export type RootStackParams = {
  Splash: undefined;
  SignIn: undefined;
  SignOut: undefined;
  CreateAccount: undefined;
  Home: undefined;
  Posts: undefined;
  SinglePost: { id: Id };
};

export function useStackNavigatorHeaderOptions(): Partial<NativeStackNavigationOptions> {
  return {
    headerStyle: {
      backgroundColor: "#8f5656",
    },
    headerTintColor: "#b5baf5",
    headerHideShadow: true,
    headerTitleStyle: {
      color: "#f720e9",
    },
  };
}
