import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { Post } from "../state/post.model";

export default function PostItem({
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
        <ProfileIconPlaceholder source={{
          uri: post.author.profileImage?.image.publicUrlTransformed,
        }} />
      </View>
    );
  };


  export const ProfileIconPlaceholder = styled(Image)<{
    height?: number;
    colour?: string;
  }>`
    width: 50px;
    height: 50px;
    border-radius: 200px;
    background-color: #FF6347;
  `;
  