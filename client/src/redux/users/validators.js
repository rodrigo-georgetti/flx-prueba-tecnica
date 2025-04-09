export const validarUsuario = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Ingrese un nombre de usuario"));
  }
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(value)) {
    return Promise.reject(
      new Error("El nombre de usuario solo debe contener letras y números")
    );
  }
  return Promise.resolve();
};

export const validarNombre = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Ingrese un nombre"));
  }
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
  if (!regex.test(value)) {
    return Promise.reject(new Error("El nombre solo debe contener letras"));
  }
  return Promise.resolve();
};

export const validarEdad = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Ingrese la edad"));
  }
  const parsedValue = Number(value);
  if (isNaN(parsedValue) || !Number.isInteger(parsedValue) || parsedValue < 0) {
    return Promise.reject(
      new Error("La edad debe ser un número entero mayor o igual a 0")
    );
  }
  return Promise.resolve();
};
