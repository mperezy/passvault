import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  isUpperCase: boolean;
  isLowerCase: boolean;
  isNumbers: boolean;
  isSymbols: boolean;
} = {
  isUpperCase: true,
  isLowerCase: true,
  isNumbers: false,
  isSymbols: false,
};

export const configuratorSlice = createSlice({
  name: 'configurator',
  initialState,
  reducers: {
    setIsUpperCase: (state, { payload }) => ({
      ...state,
      isUpperCase: payload.isUpperCase,
    }),
    setIsLowerCase: (state, { payload }) => ({
      ...state,
      isLowerCase: payload.isLowerCase,
    }),
    setIsNumbers: (state, { payload }) => ({
      ...state,
      isNumbers: payload.isNumbers,
    }),
    setIsSymbols: (state, { payload }) => ({
      ...state,
      isSymbols: payload.isSymbols,
    }),
  },
});

export const { setIsUpperCase, setIsLowerCase, setIsNumbers, setIsSymbols } =
  configuratorSlice.actions;

export const selectIsUpperCase = (state: { configurator: { isUpperCase: boolean } }) =>
  state.configurator.isUpperCase;
export const selectIsLowerCase = (state: { configurator: { isLowerCase: boolean } }) =>
  state.configurator.isLowerCase;
export const selectIsNumbers = (state: { configurator: { isNumbers: boolean } }) =>
  state.configurator.isNumbers;
export const selectIsSymbols = (state: { configurator: { isSymbols: boolean } }) =>
  state.configurator.isSymbols;
