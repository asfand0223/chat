"use client";
import React from "react";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "../components/Navbar";

const ClientLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ReduxProvider>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </ReduxProvider>
  );
};

export default ClientLayout;
