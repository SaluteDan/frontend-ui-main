import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataProvider } from '../../../app/env/CollectionProvider';
import CollectionPage from '../../../app/archive/[collection]/page';

const queryClient = new QueryClient();

const PageWithProvider = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <CollectionPage {...props} />
      </DataProvider>
    </QueryClientProvider>
  );
};

export default PageWithProvider;
