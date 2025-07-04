import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route.tsx";
import { Toaster } from "sonner";
import ThemeProvider from "./components/common/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
    <Toaster richColors position="top-right" />
  </StrictMode>
);
