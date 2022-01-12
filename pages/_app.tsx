import fs from "fs";

import * as React from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import theme from "../src/theme";

import DefaultPage from "@layouts/DefaultPage";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>qualified devs</title>
        <link href="/favicon.png" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: { scrollBehavior: "smooth" },
          }}
        />
        <DefaultPage {...pageProps}>
          <Component {...pageProps} />
        </DefaultPage>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const manifest = JSON.parse(fs.readFileSync("./src/manifest.json", "utf-8"));
  appProps.pageProps.manifest = manifest;

  return { ...appProps };
};

export default MyApp;
