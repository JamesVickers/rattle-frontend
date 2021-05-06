import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

export default function ProfileImage({
  source,
}: {
  source?: string;
}): JSX.Element {
  return (
    <ProfileImageStyled
      source={{
        uri: source,
      }}
    />
  );
}

const ProfileImageStyled = styled(Image)<{
  height?: number;
  colour?: string;
}>`
  width: 50px;
  height: 50px;
  border-radius: 200px;
  background-color: #ff6347;
`;
