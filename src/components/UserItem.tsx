import React from "react";
import { Text, View } from "react-native";
import { User } from "../state/user.model";
import ProfileImage from "./ProfileImage";

export default function UserItem({ user }: { user: User }): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "blue",
      }}>
      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
    </View>
  );
}
