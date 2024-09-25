import { DataProvider } from "@/app/env/CollectionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/app/page";

const queryClient = new QueryClient();

const PageWithProvider = (props: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Home {...props}/>
      </DataProvider>
    </QueryClientProvider>
  );
};

export default PageWithProvider;
