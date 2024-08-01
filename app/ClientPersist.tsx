"use client";

import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";
import { SessionProvider } from "next-auth/react";

export default function ClientPersist({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </SessionProvider>
  );
}
