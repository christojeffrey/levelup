import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

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
      <body
        className={`${poppins.className} min-h-screen max-w-xl mx-auto text-bw-darkest bg-bw-darker`}
      >
        {children}
      </body>
    </html>
  );
}
