import React from "react";
import { Layout } from "antd";
import logo from "../assets/Flexxus-Logo-Black-sidebar1.png";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      style={{
        width: "1280px",
        height: "91px",
        background: "#D9D9D9",
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "153px",
            height: "36px",
            position: "absolute",
            top: "27px",
            left: "63px",
          }}
        />
      </div>
    </Header>
  );
};

export default Navbar;
