import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ routes, location }) => {
  return (
    <Breadcrumb
      style={{
        height: "22px",
        marginBottom: "16px",
        marginTop: "23px",
      }}
    >
      {routes.map((route) => (
        // hacemos map sobre las posibles rutas que tiene la app
        <Breadcrumb.Item key={route.path}>
          <Link to={route.path}>
            <span
              style={{
                display: "inline-block",
                width: route.width,
                height: "22px",
                color: location.pathname === route.path ? "#000" : "#666",
              }}
            >
              {route.label}
            </span>
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
