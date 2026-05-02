import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./app/router.tsx";
import { RouterProvider } from "@tanstack/react-router"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
