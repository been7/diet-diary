import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="pb-[60px] grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
