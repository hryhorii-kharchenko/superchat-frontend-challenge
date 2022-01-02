import { useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import { PresentationData } from "../src/types/presentation";
import styles from "../src/assets/styles/App.module.scss";

import "../src/assets/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [presentation, setPresentation] = useState<
    PresentationData | undefined
  >();

  return (
    <div className={styles.container}>
      <Head>
        <title>Prettier GitHub Links</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="crossOrigin"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Component
        {...pageProps}
        presentation={presentation}
        setPresentation={setPresentation}
      />
    </div>
  );
}

export default MyApp;
