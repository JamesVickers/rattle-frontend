import "styled-components/native";
import { MyTheme } from "./myTheme";

declare module "styled-components/native" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MyTheme {}
}
