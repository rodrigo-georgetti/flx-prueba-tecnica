import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const CustomSearch = ({ placeholder = "Buscar usuarios", onSearch }) => {
  return (
    <Search
      placeholder={placeholder}
      size="large"
      // le agregamos el boton de bpusqueda al Search component
      enterButton={
        <Button
          icon={<SearchOutlined style={{ fontSize: 16 }} />}
          style={{
            width: 32,
            height: 40,
            borderWidth: 1,
            padding: 9,
            borderRadius: "0 8px 8px 0",
          }}
        />
      }
      style={{
        width: 290,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#D9D9D9",
      }}
      onSearch={onSearch}
    />
  );
};

export default CustomSearch;
