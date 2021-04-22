import styled from "styled-components/native";
import { MyColours } from "../styles/myTheme";

export const TextStyles = styled.Text<{ colour?: keyof MyColours }>`
  color: ${(props) => props.theme.colors[props.colour || "foreground"]};
`;
