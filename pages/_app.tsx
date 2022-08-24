import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import merge from "lodash.merge";
import { withTheme } from "@emotion/react";

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Verify User Demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

/* Theming */
const theme = extendTheme({
  styles: {
    global: {
      "*": {
        backgroundColor: "transparent",
      },
      a: {
        _hover: {
          textDecoration: "underline",
        },
      },
      h1: {
        fontSize: "4xl",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "lg",
      },
      h4: {
        fontSize: "md",
      },
    },
  },
});

// rainbow theme
const customTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#3A76F2",
  },
} as Theme);

function MyApp({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // prevent hydration UI bug: https://blog.saeloun.com/2021/12/16/hydration.html
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={customTheme}>
          <ChakraProvider theme={theme}>
            <Navbar></Navbar>
            <Component {...pageProps} key={router.route} />
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
