import React from "react";
import { User } from "../state/user.model";
import { Card } from "./Card";
import ProfileImage from "./ProfileImage";
import Text from "./Text";

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
