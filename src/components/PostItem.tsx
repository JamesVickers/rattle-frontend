import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Post } from "../state/post.model";
import { Id } from "../state/types";
import { Card } from "./Card";
import { Text } from "./Text";

export const PostItem = ({
  post,
  onPressPost,
}: {
  post: Post;
  onPressPost: (selectedPostId: Id) => void;
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => onPressPost(post.id)}>
      <Card>
        {/* <Text>
        {post.author.firstName} {post.author.lastName}
      </Text> */}
        <Text>{post.title}</Text>
        <Text>{post.body}</Text>
        <Text>{post.status}</Text>
      </Card>
    </TouchableOpacity>
  );
};
