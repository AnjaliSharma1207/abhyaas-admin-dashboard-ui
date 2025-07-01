import { createSlice } from '@reduxjs/toolkit';

const getInitialUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const initialState = {
  users: getInitialUsers(),
  roles: [],
  loading: false,
  error: null,
};

const persistUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      persistUsers(state.users);
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      persistUsers(state.users);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        persistUsers(state.users);
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      persistUsers(state.users);
    },
  },
});

export const { setUsers, setRoles, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
