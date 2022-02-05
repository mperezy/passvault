module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier', '@typescript-eslint'],
  rules: {
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'eol-last': ['error', 'always'],

    // allow .ts files to contain TSX code
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],

    // prevent eslint to complain about the "styles" variable being used before it was defined
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],

    // ignore errors for the react-navigation package
    'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],

    // to not complain about to use arrow components with props
    'react/function-component-definition': 'off',

    // allow to use spreading props
    'react/jsx-props-no-spreading': 'off',

    'no-plusplus': 'off',

    'react-hooks/exhaustive-deps': 0,
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'react/no-unescaped-entities': 0,
    'no-nested-ternary': 0,
    'no-console': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  root: true,
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['assets', './assets'],
          ['components', './src/components'],
          ['reduxStore', './src/redux'],
          ['services', './src/services'],
          ['screens', './src/screens'],
          ['utils', './src/utils'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
