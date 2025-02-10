import React from "react";
import Saidbar from "../components/Saidbar";

function MainLayout({ children }) {
  return (
    <div className="xl:flex xl:items-center flex">
      <Saidbar />
      <main className="w-full mx-auto lg:ml-[110px]">{children}</main>
    </div>
  );
}

export default MainLayout;
