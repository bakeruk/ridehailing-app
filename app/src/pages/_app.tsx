import { ThemeProvider } from "styled-components";

import type { AppProps } from "next/app";
import { GlobalStyles, theme } from "src/utils/theme";

/**
 * App initialiser
 */
const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />

    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
