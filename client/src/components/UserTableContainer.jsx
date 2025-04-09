import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Pagination, Modal } from "antd";

import { deleteUser } from "../redux/users/usersSlice";
const TablaUsuarios = ({ data, pageSize = 10, onEditar }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEliminarModalVisible, setIsEliminarModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const handleEliminarConfirm = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
    }
    setIsEliminarModalVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = Array.isArray(data)
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const components = {
    header: {
      cell: (props) => (
        <th
          {...props}
          style={{
            ...props.style,
            backgroundColor: "#D9D9D914",
          }}
        />
      ),
    },
  };

  return (
    <>
      <div
        style={{
          marginTop: "24px",
          width: "1088px",
          height: "605px",
          overflow: "auto",
          boxShadow: "0px 0px 4px 0px #00000040",
          borderRadius: "8px",
          backgroundColor: "#D9D9D914",
        }}
      >
        {/* tabla encerrada en un div para que pueda contener el paginado externo */}
        <Table
          size="large"
          components={components}
          dataSource={paginatedData}
          scroll={{ x: true }}
          pagination={false}
          rowKey="id"
        >
          <Table.Column
            title="Usuario"
            dataIndex="username"
            key="username"
            width={284}
            render={(text) => <CellText text={text} />}
          />
          <Table.Column
            title="Nombre"
            dataIndex="name"
            key="name"
            width={284}
            render={(text) => <CellText text={text} />}
          />
          <Table.Column
            title="Apellido"
            dataIndex="lastname"
            key="lastname"
            width={284}
            render={(text) => <CellText text={text} />}
          />
          <Table.Column
            title="Estado"
            dataIndex="status"
            key="status"
            width={98}
            render={(estado) => (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                  width: "56px",
                  height: "22px",
                  padding: "1px 8px",
                  borderRadius: "2px",
                  border: `1px solid ${
                    estado === "active" ? "#B7EB8F" : "#FFA39E"
                  }`,
                  fontSize: "14px",
                  color: estado === "active" ? "#52C41A" : "#FF4D4F",
                }}
              >
                {estado}
              </div>
            )}
          />
          <Table.Column
            title="Acciones"
            key="acciones"
            fixed="right"
            width={136}
            render={(_, record) => (
              <div style={{ display: "flex", gap: "16px" }}>
                <span
                  style={actionStyle}
                  onClick={() => onEditar && onEditar(record)}
                >
                  Editar
                </span>
                <span
                  style={actionStyle}
                  onClick={() => {
                    setSelectedUser(record);
                    setIsEliminarModalVisible(true);
                  }}
                >
                  Eliminar
                </span>
              </div>
            )}
          />
        </Table>
      </div>

      <div
        style={{
          width: "100%",
          height: "64px",
          paddingTop: "16px",
          paddingBottom: "16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: "432px",
            height: "32px",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          {/* paginación externa de tabla */}
          <Pagination
            className="custom-pagination"
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
      {/* modal para eliminar un usuario */}
      <Modal
        title="Eliminar usuario"
        open={isEliminarModalVisible}
        onOk={handleEliminarConfirm}
        onCancel={() => setIsEliminarModalVisible(false)}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
        style={{ top: 219, borderRadius: 8 }}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 16, marginBottom: 32 }}>
            ¿Estás seguro que quiere eliminar el usuario{" "}
            <span style={{ color: "#E23336" }}>@{selectedUser?.username}</span>?
          </p>
        </div>
      </Modal>
    </>
  );
};

const CellText = ({ text }) => (
  <div
    style={{
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "22px",
    }}
  >
    {text}
  </div>
);

const actionStyle = {
  fontFamily: "Roboto",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "22px",
  color: "#1890FF",
  cursor: "pointer",
  textAlign: "center",
  display: "inline-block",
};

export default TablaUsuarios;
