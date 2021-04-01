import React from "react";
import styled, { DefaultTheme } from "styled-components/native";

export const ToggleTheme = ({
  theme,
  toggleTheme,
}: {
  theme: DefaultTheme;
  toggleTheme: () => void;
}): JSX.Element => {
  return (
    <ToggleButton title="Switch Theme" theme={theme} onPress={toggleTheme} />
  );
};

const ToggleButton = styled.Button`
  background: ${(props) => props.theme.colour.background};
  border: 2px solid ${(props) => props.theme.colour.foreground};
  color: ${(props) => props.theme.colour.foreground};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  }
`;
