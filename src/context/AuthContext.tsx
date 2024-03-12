"use client";
import { SessionProvider } from "next-auth/react";

interface props {
  children: React.ReactNode;
}

const AuthContext = ({ children }: props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;