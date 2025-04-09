import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, searchUsers} from "./redux/users/usersSlice";
import React, { useEffect, useState } from "react";
import "./pagination.css";
import "./usuarios.css";
import Navbar from "./components/Navbar";
import routes from "./routes";
import { Layout, Button, Form } from "antd";
import { useLocation } from "react-router-dom";
import CustomBreadcrumb from "./components/Breadcrumb";
import CustomSearch from "./components/Search";
import SelectState from "./components/SelectState";
import UsuarioModal from "./components/UsuarioModal";
import TablaUsuarios from "./components/UserTableContainer";

const { Content } = Layout;

const App = () => {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const marginLeftValue = "98px";
  const marginRightValue = "98px";
  const { filtered = [] } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // manejador de la búsqueda por nombre o apellido
  const handleSearch = (value) => {
    dispatch(searchUsers(value));
  };

  // evento para manejar las validaciones del form
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Datos del usuario:", values);
      })
      .catch((info) => {
        console.log("Validación fallida:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Layout>
      <Navbar />

      <Content
        style={{
          marginTop: "91px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "1280px" }}>
          <div
            style={{
              marginLeft: marginLeftValue,
              marginRight: marginRightValue,
            }}
          >
            {/* Rutas seleccionables */}
            <CustomBreadcrumb routes={routes} location={location} />

            {/* Filtros */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Buscador de nombre o apellido */}
              <CustomSearch onSearch={handleSearch} />

              {/* Selector de estado */}
              <SelectState />
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                {/* Botón de Modal para agregar usuario */}
                <Button
                  onClick={() => setIsModalVisible(true)}
                  type="primary"
                  shape="default"
                  size="middle"
                  danger={false}
                  ghost={false}
                  icon={null}
                  style={{
                    backgroundColor: "#1890FF",
                    border: "1px solid #1890FF",
                    borderRadius: "8px",
                    width: "138px",
                    height: "40px",
                    gap: "8px",
                    paddingTop: "4px",
                    paddingRight: "15px",
                    paddingBottom: "4px",
                    paddingLeft: "15px",
                  }}
                >
                  Agregar usuario
                </Button>
                {/* Modal para agregar usuario */}
                <UsuarioModal
                  visible={isModalVisible}
                  onClose={handleCancel}
                  isEdit={false}
                  onSubmit={handleOk}
                />
              </div>
            </div>

            {/* Tabla */}
            <TablaUsuarios
              data={filtered}
              onEditar={(user) => {
                setUsuarioSeleccionado(user);
                setModalEditarVisible(true);
              }}
            />
            <UsuarioModal
              visible={modalEditarVisible}
              onClose={() => setModalEditarVisible(false)}
              usuario={usuarioSeleccionado}
              isEdit={true}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
