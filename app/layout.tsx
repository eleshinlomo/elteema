
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";



export const metadata: Metadata = {
  title: "Elteema",
  description: "Buy Nigerian products",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode}>) {
  return (
  <html lang='en' suppressHydrationWarning>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <body className={` antialiased`} suppressHydrationWarning>
        
        {children}
       
      </body>
    </html>
  );
}
