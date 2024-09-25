import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { EditionArray } from "@/components/mint/Editiondata";

const DataEditionContext = createContext<EditionArray | undefined>(undefined);

const fetchEditionCollection = async (): Promise<EditionArray> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editionlist`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json(); // The JSON is expected to match EditionArray type
};


export const EditionProvider: React.FC = ({ children }) => {
  const queryResult = useQuery<EditionArray>({
    queryKey: ["edition"],
    queryFn: fetchEditionCollection,
  });

  return (
    <DataEditionContext.Provider value={queryResult.data}>
      {children}
    </DataEditionContext.Provider>
  );
};

export const useEdition = (): EditionArray | undefined => {
  return useContext(DataEditionContext);
};
