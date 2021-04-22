import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Post } from "../state/post.model";
import { Id } from "../state/types";
import { Card } from "./Card";

export default function PostItem({
  post,
  onPressPost,
}: {
  post: Post;
  onPressPost: (selectedPostId: Id) => void;
}): JSX.Element {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={() => onPressPost(post.id)}>
      <Card>
        {/* <TextStyles>
        {post.author.firstName} {post.author.lastName}
      </TextStyles> */}
        <Text style={{ color: theme.colors.foreground }}>{post.title}</Text>
        <Text style={{ color: theme.colors.foreground }}>{post.body}</Text>
        <Text style={{ color: theme.colors.foreground }}>{post.status}</Text>
      </Card>
    </TouchableOpacity>
  );
}
