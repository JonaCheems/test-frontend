import LayoutGeneral from "@/components/core/layout";
import "@/styles/globals.css";
import { Layout } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <LayoutGeneral><Component {...pageProps} /></LayoutGeneral>;
}
