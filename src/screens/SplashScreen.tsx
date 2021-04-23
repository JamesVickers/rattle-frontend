import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { useUser } from "../components/User";
import { RootStackParams } from "../routes";
import { TextStyles } from "../components/TextStyles";
import { StyledLikeSvg } from "../components/LikeSvg";
import styled from "styled-components/native";
import Spacer from "../components/Spacer";

export default function SplashScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "Splash">
  >();

  // if user exists then logged in
  const user = useUser();

  const [isUnpaused, setUnpaused] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnpaused(true);
    }, 5500);

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
    <SafeAreaViewStyles
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}>
      <StyledLikeSvg width={200} height={200} />
      <Spacer height={20} />
      <TextStyles>Splash screen</TextStyles>
    </SafeAreaViewStyles>
  );
}
const SafeAreaViewStyles = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;
