import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useUser } from "../components/User";
import { ChatStackParams, ChatTabsParams } from "../routes";
import CreatePostItem from "../components/CreatePostItem";
import PostItem from "../components/PostItem";
import { ALL_POSTS_QUERY } from "../queries/AllPostsQuery";
import { useQuery } from "@apollo/client";
import { COUNT_POST_QUERY } from "../queries/CountPostsQuery";
import { Id } from "../state/types";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import Text from "../components/Text";

export default function HomeTab(): JSX.Element {
  const navigation = useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<ChatTabsParams, "Home">,
      StackNavigationProp<ChatStackParams>
    >
  >();
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
    <SafeAreaViewDefault>
      <StatusBar barStyle="dark-content" />
      <Text>{user && `${user.firstName}`}</Text>
      <Text>
        Post count: <Text>{postsCount}. </Text>
        Found using GraphQL meta query!
      </Text>
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
    </SafeAreaViewDefault>
  );
}
