import type { Metadata } from "next";
import "./globals.css";
import { Navigo } from "./font";

export const metadata: Metadata = {
  title: "NSM 2026",
  description: "National Sales Meeting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Navigo.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
