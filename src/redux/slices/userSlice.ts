import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => ({
      ...state,
      id: payload.id,
      email: payload.email,
    }),
    unsetUserData: () => ({
      ...initialState,
    }),
  },
});

export const { setUserData, unsetUserData } = userSlice.actions;

export const selectUserId = (state: { user: { id: string } }) => state.user.id;
export const selectUserEmail = (state: { user: { email: string } }) => state.user.email;
