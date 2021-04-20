import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import SafeAreaView from "react-native-safe-area-view";
import Text from "../components/Text";
import { useUser } from "../components/User";
import { RootStackParams } from "../routes";

export default function SplashScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "Splash">
  >();
  const theme = useTheme();

  // if user exists then logged in
  const user = useUser();

  const [isUnpaused, setUnpaused] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnpaused(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isUnpaused) {
      if (user) {
        navigation.replace("ChatTabs");
      } else {
        navigation.replace("SignIn");
      }
    }
  }, [user, navigation, isUnpaused]);

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
      <Text>Splash screen</Text>
    </SafeAreaView>
  );
}
