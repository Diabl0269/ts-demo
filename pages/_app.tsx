import React, { FC } from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import ThemeProvider from "../providers/ThemeProvider";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
