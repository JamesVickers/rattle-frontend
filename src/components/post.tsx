import React from "react";
import { Text, View } from "react-native";
import { Post } from "../state/post.model";

export function PostItem({
post
  }: {
    post: Post;
   
  }): JSX.Element {
        return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>PostItem!!</Text>
        <Text>{post.title}</Text>
        <Text>{post.body}</Text>
        <Text>{post.status}</Text>
        <Text>{post.author.name}</Text>
      </View>
    );
  };
