import { ThemeProvider } from "styled-components";

import { QueryClientProvider, QueryClient } from "react-query";
import type { AppProps } from "next/app";
import { GlobalStyles, theme } from "src/utils/theme";

const queryClient = new QueryClient();

/**
 * App initialiser
 */
const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />

    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
