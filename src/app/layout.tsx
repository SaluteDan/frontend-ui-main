import "./globals.css";
import React from "react";
import Head from "next/head";
import type { Metadata } from "next";

import {
  EnvironmentProps,
  EnvironmentProvider,
  useEnvironment,
} from "./env/provider";
import Header from "@/components/core/header";
import Footer from "@/components/core/footer";
import ClientLayout from "@/app/Clientlayout";

export const metadata: Metadata = {
  title: "Attributes Gallery",
  description: "COMMUNITY-CURATED WEB 3.0 MARKETPLACE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const environmentProps: EnvironmentProps = {
    // all the properties that can be passed to the `useEnvironment`
    walletAddress: process.env.NEXT_PUBLIC_ADDRESS,
    tokenId: process.env.NEXT_PUBLIC_TOKEN_ID,
    tokentier: process.env.NEXT_PUBLIC_TOKEN_TIER,
    tokendiscount: process.env.NEXT_PUBLIC_TOKEN_DISCOUNT,
    balance: process.env.NEXT_PUBLIC_ATTR_BALANCE,
    pointstaked: process.env.NEXT_PUBLIC_POINTS_STAKED,
    pointsfarmed: process.env.NEXT_PUBLIC_POINTS_MINED,
    votecount: process.env.NEXT_PUBLIC_VOTE_COUNT,
    networkName: process.env.NEXT_PUBLIC_NETWORK_NAME,
    blockchainNetwork: process.env.NEXT_PUBLIC_CHAIN,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  };

  return (
    <EnvironmentProvider {...environmentProps}>
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <body className="bg-gray-50">
          <ClientLayout>
            <Header />
            {children}
            <Footer />
          </ClientLayout>
        </body>
      </html>
    </EnvironmentProvider>
  );
}
