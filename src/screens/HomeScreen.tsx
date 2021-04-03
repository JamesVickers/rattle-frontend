import { useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { Button, StatusBar, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import debounce from "lodash.debounce";
import styled from "styled-components/native";
import SearchBar from "../components/SearchBar";
import { useUser } from "../components/User";
import UserItem from "../components/UserItem";
import { SEARCH_USERS_QUERY } from "../queries/SearchUsersQuery";
import LikeSvg from "../images/like.svg";
import { RootStackParams } from "../routes";
import { AppContext } from "../components/AppContext";

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParams, "Home">
  >();

  const {
    mode,
    toggleMode,
    isOpen,
    toggleOpen,
    openExample,
    closeExample,
  } = React.useContext(AppContext);
  // const { mode, toggleMode } = useAppContext();

  const [searchString, setSearchString] = useState("");
  const [debouncing, setDebouncing] = useState(false);

  const user = useUser();

  const [
    findUsers,
    { data: findUsersData, loading: findUsersLoading, error: findUsersError },
  ] = useLazyQuery(SEARCH_USERS_QUERY, { fetchPolicy: "no-cache" });

  const debounceAndFindUsers = useCallback(
    debounce((searchTerm: string) => {
      findUsers({
        variables: { searchTerm },
      });
      setDebouncing(false);
    }, 400),
    [],
  );

  const onChangeText = useCallback(
    (text: string) => {
      setSearchString(text);
      setDebouncing(true);
      debounceAndFindUsers(text);
    },
    [debounceAndFindUsers],
  );

  const goToSignOutScreen = useCallback(async () => {
    navigation.navigate("SignOut");
  }, [navigation]);

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>Rattle HomeScreen</Text>
        <Text>Theme: {mode}</Text>
        <Button title="toggleTheme" onPress={toggleMode} />

        <Button title="Sign Out" onPress={goToSignOutScreen} />
        <Button
          title="go to PostsScreen"
          onPress={() => {
            navigation.navigate("Posts");
          }}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {user && `Hi ${user.name}, you are logged in!!`}
        </Text>
        <StyledLikeSvg />
        <StyledBackground>
          <Button title="toggleOpen" onPress={toggleOpen} />
          <Button title="openExample" onPress={openExample} />
          <Button title="closeExample" onPress={closeExample} />
          {isOpen && <StyledText>OPEN</StyledText>}
        </StyledBackground>
        {/* <FlatList
              data={data.allUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <UserItem key={item.id} user={item} />}
              ListHeaderComponent={<Text>allUsers listHeader:</Text>}
            /> */}
        <SearchBar
          error={findUsersError}
          searchString={searchString}
          setSearchString={onChangeText}
        />
        {searchString !== "" &&
          (findUsersLoading || debouncing ? (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              Searching...
            </Text>
          ) : findUsersData ? (
            <FlatList
              data={findUsersData.allUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <UserItem key={item.id} user={item} />}
              ListEmptyComponent={<Text>No user matched found</Text>}
            />
          ) : (
            <></>
          ))}
      </View>
    </SafeAreaView>
  );
}
const StyledBackground = styled.View`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;
const StyledText = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.colors.foreground};
`;
const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.colors.foreground};
`;
