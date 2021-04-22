// import React from "react";
// import {
//   StyleProp,
//   Text as RNText,
//   TextProps as RNTextProps,
//   TextStyle,
// } from "react-native";
// import styled from "styled-components/native";
// import { MyColours } from "../styles/myTheme";

// export default function Text({
//   children,
//   styles,
//   // colour = "foreground",
//   colour,
// }: {
//   children: React.ReactNode;
//   styles?: StyleProp<TextStyle>;
//   colour?: keyof MyColours;
//   // colour?: string;
// } & Omit<RNTextProps, "style">): JSX.Element {
//   return (
//     <RNTextStyles style={[styles]} colour={colour}>
//       {children}
//     </RNTextStyles>
//   );
// }
// const RNTextStyles = styled(RNText)<{ colour?: keyof MyColours }>`
//   color: ${(props) =>
//     props.colour ? props.theme.colors[props.colour] : "#171717"};
// `;
// // const RNTextStyles = styled(RNText)<{ colour: string }>`
// //   color: red;
// // `;
export {};
