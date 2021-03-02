import React from "react";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Post } from "../state/post.model";
import { Id } from "../state/types";

export default function PostItem({
  post,
  onPressPost,
}: {
  post: Post;
  onPressPost: (selectedPostId: Id) => void;
}): JSX.Element {
  return (
    <TouchableOpacity
      onPress={() => onPressPost(post.id)}
      style={{
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "blue",
      }}>
      <Text>PostItem!!</Text>
      <Text>{post.title}</Text>
      <Text>{post.body}</Text>
      <Text>{post.status}</Text>
      {/* <Text>{post.author.name}</Text> */}
      {/* <ProfileIconPlaceholder
        source={{
          uri: post.author.profileImage?.image.publicUrlTransformed,
        }}
      /> */}
    </TouchableOpacity>
  );
}

export const ProfileIconPlaceholder = styled(Image)<{
  height?: number;
  colour?: string;
}>`
  width: 50px;
  height: 50px;
  border-radius: 200px;
  background-color: #ff6347;
`;
