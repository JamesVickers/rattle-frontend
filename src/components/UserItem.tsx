import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { User } from "../state/user.model";
import { Card } from "./Card";
import { ProfileImage } from "./ProfileImage";
import { Text } from "./Text";

export const UserItem = ({
  user,
  onSelectUser,
}: {
  user: User;
  onSelectUser?: (selectedUser: User) => void;
}): JSX.Element => {
  const cardContent = useMemo(
    () => (
      <>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user.firstName, user.lastName],
  );

  return onSelectUser ? (
    <Card>
      <TouchableOpacity onPress={() => onSelectUser(user)}>
        {cardContent}
      </TouchableOpacity>
    </Card>
  ) : (
    <Card>{cardContent}</Card>
  );
};
