import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  socialMediaSelected: string;
  socialMediaList: any;
} = {
  socialMediaSelected: '',
  socialMediaList: [],
};

export const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    setSocialMediaSelected: (state, { payload }) => ({
      ...state,
      socialMediaSelected: payload.socialMediaSelected,
    }),
    setSocialMediaList: (state, { payload }) => ({
      ...state,
      socialMediaList: payload.socialMediaList,
    }),
    getSocialMediaListFromFirebase: () => {},
  },
});

export const { setSocialMediaSelected, setSocialMediaList, getSocialMediaListFromFirebase } =
  socialMediaSlice.actions;

export const selectSocialMediaSelected = (state: { socialMedia: { socialMediaSelected: any } }) =>
  state.socialMedia.socialMediaSelected;
export const selectSocialMediaList = (state: { socialMedia: { socialMediaList: any } }) =>
  state.socialMedia.socialMediaList;
