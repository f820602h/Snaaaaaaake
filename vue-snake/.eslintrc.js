module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-param-reassign': [2, { props: false }],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
};
