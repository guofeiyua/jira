import React from "react";
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
};
