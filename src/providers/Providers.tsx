"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/redux/store/store";
import { ToastContainer } from "react-toastify";
import { logout } from "@/redux/slices/authSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
            placeholderData: (prev: unknown) => prev,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  // Token yenileme başarısız olduğunda logout işlemi
  useEffect(() => {
    const handleForceLogout = (event: CustomEvent) => {
      console.log("🔒 Force logout triggered:", event.detail.reason);
      store.dispatch(logout());
    };

    // Event listener'ı ekle
    window.addEventListener("forceLogout", handleForceLogout as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener(
        "forceLogout",
        handleForceLogout as EventListener
      );
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="light"
        limit={5}
        closeButton={true}
      />
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
