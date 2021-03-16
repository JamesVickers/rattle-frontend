import { useLazyQuery, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, StatusBar, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import styled from "styled-components/native";
import SearchBar from "../components/SearchBar";
import SignIn from "../components/SignIn";
import SignOutButton from "../components/SignOutButton";
import SignUp from "../components/SignUp";
import { useUser } from "../components/User";
import UserItem from "../components/UserItem";
import { ALL_USERS_QUERY } from "../gql/AllUsersQuery";
import { SEARCH_USERS_QUERY } from "../gql/SearchUsersQuery";
import LikeSvg from "../images/like.svg";
import { RootStackParams } from "../routes";

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "Posts">
  >();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    // , error, loading
  } = useQuery(ALL_USERS_QUERY);

  const [
    findUsers,
    {
      data: findUsersData,
      // loading,
      error: findUsersError,
    },
  ] = useLazyQuery(SEARCH_USERS_QUERY, {
    variables: { searchTerm },
    fetchPolicy: "no-cache",
  });

  const user = useUser();

  useEffect(() => {
    console.log("findingUsers...");
    findUsers();
  }, [searchTerm, findUsers]);

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
        <Text>Rattle HomeScreen</Text>
        {user ? (
          <>
            <SignOutButton />
            <Button
              title="go to PostsScreen"
              onPress={() => {
                navigation.navigate("Posts");
              }}
            />
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {user
                ? `Hi ${user.name}, you are logged in!!`
                : "Nope, not logged in.."}
            </Text>
            <StyledLikeSvg style={{ color: "red" }} />
            <StyledBackground>
              <StyledText>STYLISH</StyledText>
            </StyledBackground>
            {/* <FlatList
              data={data.allUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <UserItem key={item.id} user={item} />}
              ListHeaderComponent={<Text>allUsers listHeader:</Text>}
            /> */}
            <SearchBar
              error={findUsersError}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            {findUsersData && (
              <FlatList
                data={findUsersData.allUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <UserItem key={item.id} user={item} />
                )}
                ListHeaderComponent={
                  <Text>findUsers search results listHeader:</Text>
                }
                ListEmptyComponent={<Text>No user matched found</Text>}
              />
            )}
          </>
        ) : (
          <>
            <SignUp />
            <SignIn />
            {/* <RequestPasswordReset /> */}
          </>
        )}
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
