import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para obtener usuarios con paginación y filtros desde Redux
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    const { pagination, estadoFilter } = getState().users;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    try {
      const params = new URLSearchParams();
      params.append("limit", limit);
      params.append("offset", offset);
      if (estadoFilter) params.append("status", estadoFilter);

      const response = await fetch(
        `http://localhost:4000/users?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Error al cargar los usuarios");
      }

      const data = await response.json(); // { users: [], total: 100 }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
