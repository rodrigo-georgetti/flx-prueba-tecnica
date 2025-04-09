import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userTrunks";
const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [], // todos los usuarios
    filtered: [], // usuarios con los filtros aplicados
    status: "idle",
    error: null,
    estadoFilter: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },
  },
  // opciones del reducer
  reducers: {
    searchUsers: (state, action) => {
      const search = action.payload.trim().toLowerCase();
      state.filtered = state.data.filter((user) => {
        const name = user.name?.toLowerCase() || "";
        const lastname = user.lastname?.toLowerCase() || "";
        return name.includes(search) || lastname.includes(search);
      });
    },
    setEstadoFilter: (state, action) => {
      state.estadoFilter = action.payload;
      if (!action.payload) {
        state.filtered = state.data;
      } else {
        state.filtered = state.data.filter(
          (user) => user.status?.toLowerCase() === action.payload
        );
      }
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action) => {
      state.pagination.limit = action.payload;
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      state.data.unshift(newUser);
      state.filtered.unshift(newUser);
      state.pagination.total = state.data.length;
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const indexData = state.data.findIndex(
        (user) => user.id === updatedUser.id
      );
      const indexFiltered = state.filtered.findIndex(
        (user) => user.id === updatedUser.id
      );

      if (indexData !== -1) {
        state.data[indexData] = updatedUser;
      }

      if (indexFiltered !== -1) {
        state.filtered[indexFiltered] = updatedUser;
      }
    },

    deleteUser: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((user) => user.id !== id);
      state.filtered = state.filtered.filter((user) => user.id !== id);
      state.pagination.total = state.data.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.filtered = action.payload;
        state.pagination.total = action.payload.length;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  searchUsers,
  setEstadoFilter,
  setPage,
  setLimit,
  addUser,
  updateUser,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;
export { fetchUsers };
