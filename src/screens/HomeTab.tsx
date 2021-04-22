import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import { useUser } from "../components/User";
import { ChatTabsParams, RootStackParams } from "../routes";
import CreatePostItem from "../components/CreatePostItem";
import PostItem from "../components/PostItem";
import { ALL_POSTS_QUERY } from "../queries/AllPostsQuery";
import { useQuery } from "@apollo/client";
import { COUNT_POST_QUERY } from "../queries/CountPostsQuery";
import { Id } from "../state/types";
import { useTheme } from "styled-components/native";
import { TextStyles } from "../components/TextStyles";

export default function HomeTab(): JSX.Element {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<RootStackParams, "ChatTabs">,
      StackNavigationProp<ChatTabsParams, "Home">
    >
  >();
  const theme = useTheme();
  const user = useUser();

  const {
    data,
    // , error, loading
  } = useQuery(ALL_POSTS_QUERY);

  const {
    data: postCountData,
    // loading,
    // error
  } = useQuery(COUNT_POST_QUERY);
  const { count: postsCount } = postCountData._allPostsMeta;

  const goToPostItemScreen = useCallback(
    (selectedPostId: Id) => {
      navigation.navigate("SinglePost", { id: selectedPostId });
    },
    [navigation],
  );

  return (
    <SafeAreaView
      forceInset={{
        left: "always",
        top: "always",
        right: "always",
        bottom: "always",
      }}
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" />
      <TextStyles>{user && `${user.firstName}`}</TextStyles>
      <TextStyles>
        Post count: <TextStyles>{postsCount}. </TextStyles>
        Found using GraphQL meta query!
      </TextStyles>
      <FlatList
        data={data.allPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            key={item.id}
            post={item}
            onPressPost={goToPostItemScreen}
          />
        )}
      />
      <CreatePostItem />
    </SafeAreaView>
  );
}
