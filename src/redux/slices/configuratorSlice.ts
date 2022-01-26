import { createSlice } from '@reduxjs/toolkit';
import { resetPasswordGeneratorState } from 'reduxStore/slices/passwordSlice';

export const initialState: {
  isEasy2Read: boolean;
  isAllChar: boolean;
  isUpperCase: boolean;
  isLowerCase: boolean;
  isNumbers: boolean;
  isSymbols: boolean;
} = {
  isEasy2Read: true,
  isAllChar: false,
  isUpperCase: true,
  isLowerCase: true,
  isNumbers: false,
  isSymbols: false,
};

const resetPasswordConfiguratorState = (state: any) => ({
  ...state,
  ...initialState,
});

export const configuratorSlice = createSlice({
  name: 'configurator',
  initialState,
  reducers: {
    setIsEasy2Read: (state, { payload }) => ({
      ...state,
      isEasy2Read: payload.isEasy2Read,
    }),
    setIsAllChar: (state, { payload }) => ({
      ...state,
      isAllChar: payload.isAllChar,
    }),
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
    setIsUpperCaseAndIsLowerCase: (state, { payload }) => ({
      ...state,
      isUpperCase: payload.isUpperCase,
      isLowerCase: payload.isLowerCase,
    }),
    setIsNumbersAndIsSymbols: (state, { payload }) => ({
      ...state,
      isNumbers: payload.isNumbers,
      isSymbols: payload.isSymbols,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(resetPasswordGeneratorState, (state, { payload }) =>
      resetPasswordConfiguratorState(state)
    );
  },
});

export const {
  setIsEasy2Read,
  setIsAllChar,
  setIsUpperCase,
  setIsLowerCase,
  setIsNumbers,
  setIsSymbols,
  setIsUpperCaseAndIsLowerCase,
  setIsNumbersAndIsSymbols,
} = configuratorSlice.actions;

export const selectIsEasy2Read = (state: { configurator: { isEasy2Read: boolean } }) =>
  state.configurator.isEasy2Read;
export const selectIsAllChar = (state: { configurator: { isAllChar: boolean } }) =>
  state.configurator.isAllChar;
export const selectIsUpperCase = (state: { configurator: { isUpperCase: boolean } }) =>
  state.configurator.isUpperCase;
export const selectIsLowerCase = (state: { configurator: { isLowerCase: boolean } }) =>
  state.configurator.isLowerCase;
export const selectIsNumbers = (state: { configurator: { isNumbers: boolean } }) =>
  state.configurator.isNumbers;
export const selectIsSymbols = (state: { configurator: { isSymbols: boolean } }) =>
  state.configurator.isSymbols;
