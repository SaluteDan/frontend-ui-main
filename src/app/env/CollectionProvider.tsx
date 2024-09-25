"use client"

import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// Create the context
const DataCollectionContext = createContext();

// Function to fetch data from the first endpoint
const fetchDataCollection = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collection`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Parse JSON from the response
};

// Function to fetch data from the second endpoint
const fetchEditionCollection = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edition`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Parse JSON from the response
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  // Query for the first data collection
  const collectionQuery = useQuery({
    queryKey: ['collection'],
    queryFn: fetchDataCollection,
  });

  // Query for the second data collection
  const editionQuery = useQuery({
    queryKey: ['edition'],
    queryFn: fetchEditionCollection,
  });

  // Combine the results into a single value
  const combinedData = {
    collectionData: collectionQuery.data,
    editionData: editionQuery.data,
    isLoading: collectionQuery.isLoading || editionQuery.isLoading,
    error: collectionQuery.error || editionQuery.error,
  };

  return (
    <DataCollectionContext.Provider value={combinedData}>
      {children}
    </DataCollectionContext.Provider>
  );
};

// Hook to use the data in other components
export const useCollection = () => useContext(DataCollectionContext);




