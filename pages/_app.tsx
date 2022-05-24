import fs from "fs";
import { useEffect } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@src/theme";
import createEmotionCache from "@src/createEmotionCache";
import { useRouter } from "next/router";
import Script from "next/script";

import FeedbackProvider from "@src/components/providers/FeedbackProvider";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import initPresaleContract from "@global/privateSaleContract";
import { initWhitelistAuth } from "@global/auth";

import * as gtag from "@utils/gtag";
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  //@ts-ignore
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  initPresaleContract();
  initWhitelistAuth();

  return (
    <>
      {/* Global Site Tage (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <CacheProvider value={emotionCache}>
        <Head>
          <title>W | O | R | E</title>
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
          />{" "}
          <FeedbackProvider>
            <Component {...pageProps} />
          </FeedbackProvider>{" "}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
