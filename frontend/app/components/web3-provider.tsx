"use client";

import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { fhenixfrontier } from "@/lib/custom-chains";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [fhenixfrontier],
    transports: {
      [fhenixfrontier.id]: http(),
    },
    // Required API Keys
    walletConnectProjectId: 'b4082baef9d97afc3809b71fff4cc5dd',

    // Required App Info
    appName: "Darkpool",
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
