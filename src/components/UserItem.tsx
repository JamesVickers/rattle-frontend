import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { User } from "../state/user.model";

export default function UserItem({ user }: { user: User }): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "blue",
      }}>
      <Text>{user.name}</Text>
      <ProfileIconPlaceholder
        source={{
          uri: user.profileImage?.image.publicUrlTransformed,
        }}
      />
    </View>
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
