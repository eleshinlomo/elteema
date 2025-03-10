
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { PagesProvider } from "@/components/contextproviders/pagescontext";





export const metadata: Metadata = {
  title: "Elteema",
  description: "Buy Nigerian products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}> 
        
        {children}
       
      </body>
    </html>
  );
}
