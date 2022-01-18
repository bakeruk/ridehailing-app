import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  GlobalStyles, theme, muiTheme
} from "src/utils/theme";

const queryClient = new QueryClient();

/**
 * App initialiser
 */
const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <MuiThemeProvider theme={muiTheme}>
    <ThemeProvider theme={theme}>
      <ToastContainer />

      <GlobalStyles />

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default App;
