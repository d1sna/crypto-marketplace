import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html className="dark" lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Play&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" sizes="<generated>" />

        <meta name="apple-itunes-app" content="app-id=1438144202"></meta>
        <meta name="google-play-app" content="app-id=io.metamask"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
