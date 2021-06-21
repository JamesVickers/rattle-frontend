import React from "react";
import { SafeAreaViewDefault } from "../components/SafeAreaViewDefault";
import { useUser } from "../components/User";
import { ProfileImage } from "../components/ProfileImage";
import { Outer } from "../components/Outer";
import { Text } from "../components/Text";

export const ProfileTab = (): JSX.Element => {
  const user = useUser();

  return (
    <SafeAreaViewDefault>
      <Outer>
        <Text>Profile</Text>
        <ProfileImage source={user.profileImage?.image.publicUrlTransformed} />
      </Outer>
    </SafeAreaViewDefault>
  );
};
