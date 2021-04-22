import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Post } from "../state/post.model";
import { Id } from "../state/types";
import { Card } from "./Card";
import { TextStyles } from "./TextStyles";

export default function PostItem({
  post,
  onPressPost,
}: {
  post: Post;
  onPressPost: (selectedPostId: Id) => void;
}): JSX.Element {
  return (
    <TouchableOpacity onPress={() => onPressPost(post.id)}>
      <Card>
        {/* <TextStyles>
        {post.author.firstName} {post.author.lastName}
      </TextStyles> */}
        <TextStyles>{post.title}</TextStyles>
        <TextStyles>{post.body}</TextStyles>
        <TextStyles>{post.status}</TextStyles>
      </Card>
    </TouchableOpacity>
  );
}
