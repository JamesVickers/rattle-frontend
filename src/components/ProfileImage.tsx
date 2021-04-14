import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

export default function ProfileImage({
  source,
}: {
  source?: string;
}): JSX.Element {
  return (
    <ProfileImageStyles
      source={{
        uri: source,
      }}
    />
  );
}

const ProfileImageStyles = styled(Image)<{
  height?: number;
  colour?: string;
}>`
  width: 50px;
  height: 50px;
  border-radius: 200px;
  background-color: #ff6347;
`;
