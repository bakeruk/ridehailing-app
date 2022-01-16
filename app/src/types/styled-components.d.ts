// import "styled-components";

import { Theme } from "src/utils/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType, Theme { }
}
