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

const infoMessages = {
  copied2Clipboard: 'The password was copied to clipboard',
  newPassword: 'New password generated',
  about2CreatePassword: "You're about to create a new password",
};

const appColors = {
  textTint: '#FFF',
  maximumTintColorSlider: '#d3d3d3',
  activeTint: '#9ac8fc',
  primary: '#3091e0',
  primaryDark: '#236daa',
};

export { devWarnings, lower, upper, number, symbols, popoverMessage, appColors, infoMessages };
