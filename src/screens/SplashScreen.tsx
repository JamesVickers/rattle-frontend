import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { useUser } from "../components/User";
import { ChatStackParams, RootStackParams } from "../routes";
import { StyledLikeSvg } from "../components/LikeSvg";
import styled from "styled-components/native";
import { Spacer } from "../components/Spacer";
import { TextStyled } from "../components/TextStyled";

export const SplashScreen = (): JSX.Element => {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<RootStackParams, "Splash">,
      StackNavigationProp<ChatStackParams>
    >
  >();

  // if user exists then logged in
  const user = useUser();

  const [isUnpaused, setUnpaused] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnpaused(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isUnpaused) {
      if (user) {
        navigation.replace("ChatStack");
      } else {
        navigation.replace("SignIn");
      }
    }
  }, [user, navigation, isUnpaused]);

  return (
    <SafeAreaViewStyled
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}>
      <StyledLikeSvg width={200} height={200} />
      <Spacer height={10} />
      <TextStyled>Splash screen</TextStyled>
    </SafeAreaViewStyled>
  );
};
const SafeAreaViewStyled = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;
