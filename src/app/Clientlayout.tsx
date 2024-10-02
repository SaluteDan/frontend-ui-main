// app/ClientLayout.tsx
"use client";

import React, { createContext, PropsWithChildren, useContext } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientLayout({ children }: PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={queryClient}>
        {children} {/* Render children directly */}
    </QueryClientProvider>
  );
}
