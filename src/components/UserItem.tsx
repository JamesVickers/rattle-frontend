import React from "react";
import { Text } from "react-native";
import { useTheme } from "styled-components/native";
import { User } from "../state/user.model";
import { Card } from "./Card";
import ProfileImage from "./ProfileImage";

export default function UserItem({ user }: { user: User }): JSX.Element {
  const theme = useTheme();
  return (
    <Card>
      <Text style={{ color: theme.colors.foreground }}>
        {user.firstName} {user.lastName}
      </Text>
      <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
    </Card>
  );
}
