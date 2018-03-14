module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
  },
  overrides: [
    {
      files: '**/__tests__/*.js',
      env: { jest: true },
    },
  ],
}
