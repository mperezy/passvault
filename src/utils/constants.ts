const lower = 'abcdefghijklmñopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const number = '0123456789';
const symbols = '[]{}<>":|!@#$%^&*()_+`~/';

const devWarnings = [
  'Clipboard has been extracted from react-native core',
  'AsyncStorage has been extracted from react-native core',
  'Setting a timer for a long period of time, i.e. multiple minutes',
];

const appColors = {
  textTint: '#FFF',
  maximumTintColorSlider: '#d3d3d3',
  activeTint: '#9ac8fc',
  primary: '#3091e0',
  primaryDark: '#236daa',
};

export { devWarnings, lower, upper, number, symbols, appColors };
