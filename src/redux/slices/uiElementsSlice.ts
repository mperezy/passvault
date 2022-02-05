import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbarMessage: '',
  snackbarVisible: false,
  modalTitle: '',
  modalMessage: '',
  modalVisible: false,
};

const initialSnackbarState = {
  snackbarMessage: '',
  snackbarVisible: false,
};

const initialModalState = {
  modalTitle: '',
  modalMessage: '',
  modalVisible: false,
};

export const uiElementsSlice = createSlice({
  name: 'uiElements',
  initialState,
  reducers: {
    // snackbar actions
    setSnackbarMessage: (state, { payload }) => ({
      ...state,
      snackbarMessage: payload.snackbarMessage,
    }),
    setSnackbarVisible: (state, { payload }) => ({
      ...state,
      snackbarVisible: payload.snackbarVisible,
    }),
    resetSnackbar: (state) => ({
      ...state,
      ...initialSnackbarState,
    }),

    // modal actions
    setModalTitle: (state, { payload }) => ({
      ...state,
      modalTitle: payload.modalTitle,
    }),
    setModalMessage: (state, { payload }) => ({
      ...state,
      modalMessage: payload.modalMessage,
    }),
    setModalVisible: (state, { payload }) => ({
      ...state,
      modalVisible: payload.modalVisible,
    }),
    resetModal: (state) => ({
      ...state,
      ...initialModalState,
    }),
  },
});

export const {
  setSnackbarMessage,
  setSnackbarVisible,
  resetSnackbar,
  setModalTitle,
  setModalMessage,
  setModalVisible,
  resetModal,
} = uiElementsSlice.actions;

// snackbar select
export const selectSnackbarMessage = (state: { uiElements: { snackbarMessage: any } }) =>
  state.uiElements.snackbarMessage;
export const selectSnackbarVisible = (state: { uiElements: { snackbarVisible: any } }) =>
  state.uiElements.snackbarVisible;

// modal select
export const selectModalTitle = (state: { uiElements: { modalTitle: any } }) =>
  state.uiElements.modalTitle;
export const selectModalMessage = (state: { uiElements: { modalMessage: any } }) =>
  state.uiElements.modalMessage;
export const selectModalVisible = (state: { uiElements: { modalVisible: any } }) =>
  state.uiElements.modalVisible;
