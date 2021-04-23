import styled from "styled-components/native";
import LikeSvg from "../images/like.svg";

export const StyledLikeSvg = styled(LikeSvg)`
  color: ${(props) => props.theme.colors.foreground};
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.foreground};
`;
