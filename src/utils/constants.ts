const lower = 'abcdefghijklmñopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const number = '0123456789';
const symbols = '[]{}<>":|!@#$%^&*()_+`~/';

const devWarnings = [
  'Clipboard has been extracted from react-native core',
  'AsyncStorage has been extracted from react-native core',
  'Setting a timer for a long period of time, i.e. multiple minutes',
  'Picker has been extracted from react-native core and will be removed',
];

const popoverMessage = 'You can generate passwords without store them.';

const defaultEmptyPasswordDescription = 'This password has no description. Please update it.';

const infoMessages = {
  copied2Clipboard: 'The password was copied to clipboard',
  newPassword: 'New password generated',
  about2CreatePassword: "You're about to create a new password",
};

const FIREBASE_STORAGE_URL = 'https://firebasestorage.googleapis.com';
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;

const imagesTokens = {
  FIREBASE_FIRESTORAGE_WELCOME_IMAGE_TOKEN: '9a72b084-fbf7-4ec0-bfc7-4c0c4fe923c7',
  FIREBASE_FIRESTORAGE_PASSWORD_GENERATOR_IMAGE_TOKEN: '48ac40a8-14ac-4b31-8246-1b9a64efc19e',
  FIREBASE_FIRESTORAGE_SIGNUP_IMAGE_TOKEN: '9a4c9252-2f1e-4580-868c-e5d6fd383cd9',
  FIREBASE_FIRESTORAGE_EASY_SIGNUP_IMAGE_TOKEN: '65edc2f3-657d-43f9-89b1-a2e1be19e41f',
  FIREBASE_FIRESTORAGE_FREE2USE_IMAGE_TOKEN: '287fce56-7f18-4d06-a85b-24b6fbc42171',
  FIREBASE_FIRESTORAGE_PASSWORDS_LISTED_IMAGE_TOKEN: '79295f0a-cf45-4ed2-aa1d-0e7c29cafea3',
  FIREBASE_FIRESTORAGE_PASSWORD_EDIT_IMAGE_TOKEN: '5f6da2b8-26cc-48ca-8352-30afd0cb3dd3',
  FIREBASE_FIRESTORAGE_ONBOARDING_COMPLETE_IMAGE_TOKEN: '5cf416cc-0f22-4ca6-be38-fc816742a76e',
};

const appColors = {
  textTint: '#FFF',
  maximumTintColorSlider: '#d3d3d3',
  activeTint: '#9ac8fc',
  primary: '#3091e0',
  primaryDark: '#236daa',
};

export interface PasswordItemI {
  passwordId: string;
  passwordGenerated: string;
  socialMedia: string;
  description: string;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
  navigation: any;
}

export interface PasswordIconsI {
  passwordId: string;
  socialMedia: string;
  description: string;
  passwordGenerated: string;
  passwordVisible: boolean;
  setPasswordVisible: any;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
  navigation: any;
}

export interface PasswordI {
  id: string;
  createdAt: number;
  description: string;
  password_generated: string;
  social_media: string;
}

export {
  devWarnings,
  lower,
  upper,
  number,
  symbols,
  popoverMessage,
  defaultEmptyPasswordDescription,
  appColors,
  infoMessages,
  FIREBASE_STORAGE_URL,
  FIREBASE_STORAGE_BUCKET,
  imagesTokens,
};
