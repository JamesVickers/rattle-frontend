import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, StatusBar, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import styled from "styled-components/native";
import SignIn from "../components/SignIn";
import { useUser } from "../components/User";
import UserItem from "../components/UserItem";
import { ALL_USERS_QUERY } from "../gql/AllUsersQuery";
import LikeSvg from "../images/like.svg";
import { RootStackParams } from "../routes";

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "Posts">
  >();

  const {
    data,
    // , error, loading
  } = useQuery(ALL_USERS_QUERY);

  const user = useUser();

  console.log("user: ", user);

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1, backgroundColor: "gold" }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>HomeScreen!!</Text>
        <Button
          title="go to PostsScreen"
          onPress={() => {
            navigation.navigate("Posts");
          }}
        />
        <StyledLikeSvg style={{ color: "red" }} />
        <StyledBackground>
          <StyledText>STYLISH</StyledText>
        </StyledBackground>
        <SignIn />
        <FlatList
          data={data.allUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <UserItem key={item.id} user={item} />}
          ListHeaderComponent={<Text>allUsers listHeader:</Text>}
        />
      </View>
    </SafeAreaView>
  );
}
const StyledBackground = styled.View`
  padding: 20px;
  background-color: ${(props) => props.theme.primaryBackground};
`;
const StyledText = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.primaryBackgroundText};
`;
const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.primaryBackgroundText};
`;
