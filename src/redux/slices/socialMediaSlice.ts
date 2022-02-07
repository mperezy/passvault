import { createSlice } from '@reduxjs/toolkit';

interface socialMediaI {
  id: string;
  name: string;
}

export const initialState: {
  socialMediaPicked: string;
  socialMediaList: Array<socialMediaI>;
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

export const selectSocialMediaPicked = (state: { socialMedia: { socialMediaPicked: string } }) =>
  state.socialMedia.socialMediaPicked;
export const selectSocialMediaList = (state: {
  socialMedia: { socialMediaList: Array<socialMediaI> };
}) => state.socialMedia.socialMediaList;
