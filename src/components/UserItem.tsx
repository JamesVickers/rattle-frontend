import React from "react";
import { User } from "../state/user.model";
import { Card } from "./Card";
import ProfileImage from "./ProfileImage";
import { TextStyles } from "./TextStyles";

export default function UserItem({ user }: { user: User }): JSX.Element {
  return (
    <Card>
      <TextStyles>
        {user.firstName} {user.lastName}
      </TextStyles>
      <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
    </Card>
  );
}
