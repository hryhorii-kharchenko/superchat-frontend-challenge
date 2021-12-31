import Head from "next/head";
import type { AppProps } from "next/app";

import styles from "../src/assets/styles/App.module.scss";

import "../src/assets/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prettier GitHub Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
