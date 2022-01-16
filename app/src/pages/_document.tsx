/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ServerStyleSheet } from "styled-components";

import Document, {
  Html,
  Head,
  Main,
  NextScript
} from "next/document";

/**
 * Custom document
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: React.ComponentType) => (props: any) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}

            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render = () => (
    <Html lang="en-GB">
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
        />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}