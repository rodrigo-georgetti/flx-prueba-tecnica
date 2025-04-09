import React from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setEstadoFilter } from "../redux/users/usersSlice";

const SelectState = () => {
  const dispatch = useDispatch();
  const estadoSeleccionado = useSelector((state) => state.users.estadoFilter);

  const handleEstadoChange = (value) => {
    dispatch(setEstadoFilter(value ? value.toLowerCase() : ""));
  };

  return (
    <Select
      placeholder="Filtrar por estado"
      size="large"
      value={
        estadoSeleccionado
          ? estadoSeleccionado.charAt(0).toUpperCase() +
            estadoSeleccionado.slice(1)
          : undefined
      }
      // le ponemos mayúscula al comienzo para igualar el formato que trae del estado global
      onChange={handleEstadoChange}
      allowClear
      style={{
        width: 210,
        height: 40,
        borderRadius: 8,
        border: "1px solid #D9D9D9",
        backgroundColor: "#FFFFFF",
      }}
      options={[
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ]}
    />
  );
};

export default SelectState;
