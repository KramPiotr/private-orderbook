import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ConnectKitButton } from "connectkit";
const inter = Inter({ subsets: ["latin"] });
import { Web3Provider } from "./components/web3-provider";
import Navbar from "./navbar";
import { ethers } from "ethers";
import { FhenixClient } from "fhenixjs";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Darkpool",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <Web3Provider>
        <body className={inter.className}>
          <ChakraProvider>
            <Navbar />
            <main className="w-full max-w-[800px]  flex flex-col  items-center mx-auto">
              {children}
            </main>
          </ChakraProvider>
        </body>
      </Web3Provider>
    </html>
  );
}
