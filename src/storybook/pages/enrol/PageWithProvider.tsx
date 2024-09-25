"use client";

import React from 'react';
import { NextPage } from 'next';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Enrol from '@/app/enrol/page';

const queryClient = new QueryClient();


const PageWithProvider:NextPage = (props) => {
    return (
      <QueryClientProvider client={queryClient}>
          <Enrol {...props} />
      </QueryClientProvider>
    );
  };
  
  export default PageWithProvider;