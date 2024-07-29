import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/Navbar/Navbar";
import { ReduxProvider } from "@/redux/features/Provider";
import ClientPersist from "./ClientPersist";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Erlang",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ClientPersist>
            <Navbar />
            {children}
          </ClientPersist>
        </ReduxProvider>
      </body>
    </html>
  );
}
