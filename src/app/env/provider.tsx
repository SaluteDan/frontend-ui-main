"use client"

import React, { createContext, PropsWithChildren, useContext } from "react";

type EnvironmentProps = {
  walletAddress?: string;
  tokenId?: string;
  tokentier: number;
  tokendiscount: number | undefined;
  balance?: string | null;
  pointstaked?: string | null;
  pointsfarmed?: string | null;
  votecount?: number | null;
  blockchainNetwork?: string;
  appData?: object;
}

const EnvironmentContext = createContext<EnvironmentProps>({});

export const EnvironmentProvider = ({
  children,
  ...environmentProps
}: PropsWithChildren<EnvironmentProps>) => {
  return (
    <EnvironmentContext.Provider value={environmentProps}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => useContext(EnvironmentContext);