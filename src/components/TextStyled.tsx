import styled from "styled-components/native";
import { MyColours, MyFontSize } from "../styles/myTheme";

export const TextStyled = styled.Text<{
  fontSize?: keyof MyFontSize;
  colour?: keyof MyColours;
}>`
  color: ${(props) => props.theme.colors[props.colour || "foreground"]};
  font-size: ${(props) => props.theme.fontSize[props.fontSize || "body"]}px;
`;
