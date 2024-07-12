import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LevelUp",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="sr">
      <body className={`${poppins.className} min-h-screen h-screen max-w-xl mx-auto text-bw-darkest bg-[#FCFAEE]`}>{children}</body>
    </html>
  );
}
