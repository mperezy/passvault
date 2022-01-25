import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  socialMediaPicked: string;
  socialMediaList: any;
} = {
  socialMediaPicked: '',
  socialMediaList: [],
};

export const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    setSocialMediaPicked: (state, { payload }) => ({
      ...state,
      socialMediaPicked: payload.socialMediaPicked,
    }),
    setSocialMediaList: (state, { payload }) => ({
      ...state,
      socialMediaList: payload.socialMediaList,
    }),
    getSocialMediaListFromFirebase: () => {},
  },
});

export const { setSocialMediaPicked, setSocialMediaList, getSocialMediaListFromFirebase } =
  socialMediaSlice.actions;

export const selectSocialMediaPicked = (state: { socialMedia: { socialMediaPicked: any } }) =>
  state.socialMedia.socialMediaPicked;
export const selectSocialMediaList = (state: { socialMedia: { socialMediaList: any } }) =>
  state.socialMedia.socialMediaList;
