module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  "parser": "babel-eslint",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/destructuring-assignment": "off",
    "arrow-parens": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "react/prop-types": 0,
    "no-console": 0,
    "react/no-access-state-in-setstate": 0,
    "react/no-array-index-key": 0,
    "no-restricted-syntax": 0,
    "react/no-unused-state":0,
    "no-nested-ternary":0
  },
};
