import Navbar from "./components/navbar/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rift",
  description: "Shorter Url",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Navbar></Navbar>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
