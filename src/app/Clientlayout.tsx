// app/ClientLayout.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientLayout({ children }) {

  return (
    <QueryClientProvider client={queryClient}>
      {/* Your interactive layout content here */}
      {children}
    </QueryClientProvider>
  );
}
