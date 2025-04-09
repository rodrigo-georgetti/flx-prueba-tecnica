import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import {
  validarUsuario,
  validarNombre,
  validarEdad,
} from "../redux/users/validators";
import { addUser, updateUser } from "../redux/users/usersSlice";

const { Option } = Select;

const UsuarioModal = ({ usuario, visible, onClose, isEdit = false }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (usuario) {
      form.setFieldsValue(usuario);
    } else {
      form.resetFields();
    }
  }, [usuario, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Detallamos los campos a utilizar
        const usuarioProcesado = {
          name: values.Nombre,
          lastname: values.Apellido,
          username: values.Usuario,
          status: values.Estado,
          email: values.Email,
          age: values.Edad,
        };

        if (isEdit) {
          // Si estamos editando, usamos el ID existente
          const usuarioEditado = {
            ...usuario,
            ...usuarioProcesado,
          };
          dispatch(updateUser(usuarioEditado));
        } else {
          // Si estamos agregando, creamos uno nuevo en formato UUID
          const nuevoUsuario = {
            id: crypto.randomUUID(),
            ...usuarioProcesado,
          };
          dispatch(addUser(nuevoUsuario));
        }

        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Errores de validación:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={usuario ? "Editar usuario" : "Agregar usuario"}
      style={{
        width: 572,
        height: 401,
        top: 219,
        borderRadius: 8,
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          style={{
            width: 139,
            height: 32,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {isEdit ? "Guardar cambios" : "Agregar usuario"}
        </Button>,
      ]}
      // dado que los modals son idénticos en su aspecto y campos, reutilizamos este componente solo cambiandole el título preguntando por "isEdit" para saber de cual se trata
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            paddingTop: 16,
          }}
        >
          <div
            style={{
              width: 244,
              height: 258,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              label="Usuario"
              name="Usuario"
              rules={[
                { required: true, message: "Ingrese un usuario" },
                { validator: validarUsuario },
              ]}
            >
              <Input placeholder="johndoe" />
            </Form.Item>
            <Form.Item
              label="Nombre"
              name="Nombre"
              rules={[
                { required: true, message: "Ingrese un nombre" },
                { validator: validarNombre },
              ]}
            >
              <Input placeholder="john" />
            </Form.Item>
            <Form.Item
              label="Estado"
              name="Estado"
              rules={[{ required: true, message: "Seleccione un estado" }]}
            >
              <Select placeholder="Seleccione un estado">
                <Option value="Activo">Activo</Option>
                <Option value="Inactivo">Inactivo</Option>
              </Select>
            </Form.Item>
          </div>

          <div
            style={{
              width: 244,
              height: 258,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                { required: true, message: "Ingrese el email" },
                { type: "email", message: "Correo inválido" },
              ]}
            >
              <Input placeholder="johndoe@domain.com" />
            </Form.Item>
            <Form.Item
              label="Apellido"
              name="Apellido"
              rules={[
                { required: true, message: "Ingrese el apellido" },
                { validator: validarNombre },
              ]}
            >
              <Input placeholder="doe" />
            </Form.Item>
            <Form.Item
              label="Edad"
              name="Edad"
              rules={[
                { required: true, message: "Seleccione una edad" },
                { validator: validarEdad },
              ]}
            >
              <Input placeholder="43" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default UsuarioModal;
