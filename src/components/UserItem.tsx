import React from "react";
import { Text } from "react-native";
import { User } from "../state/user.model";
import { Card } from "./Card";
import ProfileImage from "./ProfileImage";

export default function UserItem({ user }: { user: User }): JSX.Element {
  return (
    <Card>
      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
    </Card>
  );
}
